import os  
import sys
from selenium import webdriver  
from selenium.webdriver.common.keys import Keys  
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException
import urllib3
import pymongo
import time
# tells chrome to run in headless mode so we dont waste resources in our GUI
chrome_options = Options()  
chrome_options.add_argument("--headless") 

# tells the webdriver where our browser binary is located on our system
chrome_options.binary_location = '/usr/bin/google-chrome'  

# tells the webdriver to use chromedriver and pass in our specified options
driver = webdriver.Chrome(executable_path='chromedriver', options=chrome_options) 


# defining the database connection
myclient = pymongo.MongoClient("mongodb://localhost:27017/")

# defining our database
mydb = myclient["crawlview"]

# defining the collection in our database
mycol = mydb['nodesandlinks']
nodescol = mydb['nodes']
linkscol = mydb['links']
# this is the url we typed in when running scrape.py in bash
START = sys.argv[1] 
startprefix = "http://www."+START


# this is an array of all links that fall under the same subdirectory 
# we want to use these as seeds to make sure we stay on the same site
inside = []

# dont really need this in production. delete before posting
outside = [] 
checked = {''}


# we use a try/except to make sure the driver is able to connect to the starter site
# successfully. If not, it throws an error message and closes the driver and then the spider
try:
    # tells our driver to time out if the page doesn't load in 5 seconds
    driver.set_page_load_timeout(5)

    # here we actually grab the first page
    driver.get('http://www.'+START) 
except TimeoutException as ex:
    isrunning = 0
    print("Exception has been thrown. " + str(ex))
    driver.close()

# grabs all link elements from the page
elems = driver.find_elements_by_xpath("//a[@href]") 
title = driver.title
nodescol.insert_one({'url':"http://www."+START, 'title':title})
# loop through each found link element
for elem in elems:

    # we need this to get the url from the link element
    href = elem.get_attribute("href") 
        
    # ensures we dont duplicate nodes
    if href not in checked and href not in inside:



        # appends the href and the page we found it on to the links list in the proper format

       # mycol.insert_one({'node':href, 'source':"http://www."+START, 'target':href})        
        
        # adds our starting link to the set of checked urls
        checked.add("http://www."+START)

    #parses out the links that lead to another site
    if START in href and href not in inside:
        inside.append(href)
        #nodescol.insert_one({'url':href, 'title':''})
        linkscol.insert_one({'source':"http://www."+START, 'target':href})
    else:
        pass

    # prints a status update to the console
    print('inside: ' + str(len(inside)))
    print('checked: '+str(len(checked)))
    print ('--------------------------------------')

    # pauses for one second. Web spiders move so fast that piping them into a visualizer in real-time
    # would make the visualizer move so fast it would make a human watching it get dizzy
    # so I slowed it down for this demo


# now we start looping through the found links, executing the same process we executed on the
# starting point above
for found in inside:

    try:
        driver.set_page_load_timeout(5)
        driver.get(found)
        elems = driver.find_elements_by_xpath("//a[@href]") #grab all link elements from the page
        title = driver.title
        nodescol.insert_one({'url':found, 'title':title})
        #myquery = { 'url': found }
        #newvalues = {'$set': {'title': title}}
        #nodescol.update_one(myquery, newvalues)
        #loop through each found link element
        for elem in elems:
            href = elem.get_attribute("href") #we need this to get the url from the link element
        
            #ensures we dont duplicate nodes
            if href not in checked and href not in inside:
                #appends the new url to the nodes list in the format we will need for the d3 graph

                checked.add(found)
                #mycol.insert_one({'node':href, 'source':found, 'target':href})   

                #parses out the links that lead to another site
            if START in href and href not in inside:
                inside.append(href)
                #nodescol.insert_one({'url':href,'title':''})
                linkscol.insert_one({'source':found, 'target':href})
            else:
                pass

    except TimeoutException as ex:
        checked.add(found)
        print('timed out on '+found+' moving on.....')


        
        
        


    print('inside: ' + str(len(inside)))
    print('checked: '+str(len(checked)))
    print ('--------------------------------------')
driver.close()
