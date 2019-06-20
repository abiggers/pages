import os  
from selenium import webdriver  
from selenium.webdriver.common.keys import Keys  
from selenium.webdriver.chrome.options import Options  
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0
import urllib3
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options  
from selenium.webdriver.common.keys import Keys
import pymongo
chrome_options = Options()  
chrome_options.add_argument("--headless")  
chrome_options.binary_location = '/usr/bin/google-chrome'  
#defining the db connection
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
#defining our db
mydb = myclient["crawlview"]

ff = webdriver.Chrome(executable_path='chromedriver', options=chrome_options)
ff.get("http://www.neopets.com")


while True:
    wait = WebDriverWait(ff, 10)
    favicons = ff.find_elements_by_xpath('//link[@rel="shortcut icon"]')

    elems = ff.find_elements_by_xpath("//a[@href]")
    for elem in elems:
        print ('text: '+str(elem.text)+'     link:'+elem.get_attribute("href"))

    ff.close()
