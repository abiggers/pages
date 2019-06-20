#!/usr/bin/env python
import requests
import datetime
import os
import sys
import json
import urllib3
import stem
import pymongo
from pymongo import MongoClient
import bs4
from stem.control import Controller
from stem.connection import connect
from stem import Signal
from bs4 import BeautifulSoup as bs
import re

session = requests.session()
session.proxies = {}
session.proxies['http'] = 'socks5h://localhost:9050'
session.proxies['https'] = 'socks5h://localhost:9050'

#defines the database connection
client = MongoClient('mongodb://localhost:27017/')
db = client.torcrawl_db
collection = db.onions

# get a master list of onion addresses
def get_onion_list():
    stored_onions = []
    try:
      pull = collection.find({'attempts': 0})
      for item in pull:
        stored_onions.append(item['address'])
    except:
        print("Unable to locate master list of urls. make sure that your mongodb daemon is running.")
        sys.exit(0)

    return stored_onions

# connects to the tor network
def connectify():
    controller = connect()
    controller.authenticate()
    controller.signal(Signal.NEWNYM)
    print('Tor is running version %s' % controller.get_version())

    # origin ip address
    origin = json.loads(requests.get('http://httpbin.org/ip').text)
    nonTor = origin["origin"].split(',')

    # ip address when using the tor proxy connection
    tOrigin = json.loads(session.get('http://httpbin.org/ip').text)
    tOriginArr = tOrigin["origin"].split(',')

    print('Origin IP Address: '+nonTor[0] +
          '           IP Over Tor: ' + tOriginArr[0])
    if not controller:
      # exit if unable to get a connection to the tor network
        print('Attempt to establish a connection with the Tor network has failed. TorCrawl will now close...')
        sys.exit(1)


#function for looping through the list of onion addresses
def loopify():
    onions = get_onion_list()
    new_onions = []
    print("[*] Total onions for scanning: %d" % len(onions))
    count = 0
    

    for onion in onions:
            #current timestamp
            timestamp = datetime.datetime.utcnow()

            #the database entry that corrisponds with the current address being scraped
            db_entry = collection.find_one({ 'address': onion})
            db_id = db_entry['_id']
            db_attempt = db_entry['attempts'] + 1
            db_timeout = db_entry['timeout']

            # a list to hold string versions of all link tags on the page
            all_links = []

            # a list to hold all found subdirectories
            subdirs = []
                
            # a list to hold all found links to other tor addresses    
            relatedOnions = []

            # a list to hold string versions of all image tags on the page
            all_images = []

            # a list to hold string versions of all script tags on the page
            all_scripts = []

            try:
                print('Now scanning onion address %s' % onion)
                
                page = session.get(onion, timeout=db_timeout, headers={'Accept': 'text/*'})
                soup = bs(page.text, features='lxml')
                title = soup.find('title')
                meta = soup.find('meta')
                links = soup.find_all('a')
                images = soup.find_all('img')
                scripts = soup.find_all('script')
                emails = re.findall(r'[\w\.-]+@[\w\.-]+\.\w+',page.text)

                for image in images:
                    all_images.append(str(image))

                for script in scripts:
                    all_scripts.append(str(script))

                

                for link in links:
                    all_links.append(str(link))

                    #makes sure we dont waste time with linked css stylesheets
                    if link.has_attr('href'):

                        #makes sure we are only working with links to other darkweb locations
                        if link['href'].endswith('.onion') and onion not in link['href']:
                            relatedOnions.append(link['href'])

                            #handles newly discovered onion addresses
                            if link['href'] not in onions and link['href'] not in new_onions:
                                print('Found new onion address %s and added it to the list' % link['href'])
                                new_onions.append(link['href'])
                                collection.insert_one({ 'address': link['href'], 'timeout':15, 'attempts': 0})

                        #creates a list of all links to other pages on the same site
                        if link['href'].startswith('/') or onion in link['href']:
                            subdirs.append(link['href'])


                # a dictionary containing all of the data for our scrape
                d = {'timestamp': timestamp, 'title': str(title), 'meta': str(meta), 'headers': dict(page.headers), 'status_code': page.status_code,
                         'snapshot': page.text, 'emails': emails, 'images': all_images, 'scripts': all_scripts, 'links': {'all_links': all_links, 'subdirs': subdirs, 'related_onions': relatedOnions, 'timestamp': timestamp}}


                collection.update_one({"_id": db_id},{"$set": {"attempts": db_attempt, "scrape_data":{str(db_attempt): d} }})
                print('scraped data added to the database')
            except IOError:
                print('failed to connect to %s, moving on....' % onion)
                collection.update_one({"_id":db_id},{"$set": {"attempts": db_attempt, "timeout": db_timeout+5}})
                count += 1
                print(count)
                continue

            count += 1
            print(count)

connectify()
loopify()
