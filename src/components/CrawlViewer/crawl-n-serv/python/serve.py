# importing our server and database communication packages. 
# In this case I decided to serve with flask and use a mongodb database
from flask import Flask     
from flask import request 
from flask_cors import CORS
import pymongo
import json
import time
import random
r = lambda: random.randint(0,255)
#defining the db connection
myclient = pymongo.MongoClient("mongodb://localhost:27017/")

#defining our db
mydb = myclient["crawlview"]

#Creates an instance of our imported Flask class
app = Flask(__name__)
CORS(app)
import pymongo

mycol = mydb["nodesandlinks"]
nodescol = mydb['nodes']
linkscol = mydb['links']

alreadysent_nodes = []
alreadysent_links = []
url = []


#creates the route that our D3 Graph will be using to query the db
@app.route('/')
def crawl_view():

        nodes = []
        links = []
        for x in nodescol.find():
                if x['url'] not in alreadysent_nodes:
                        nodes.append({'id':x['url'], 'title':x['title'], 'url':x['url'], 'color':'#%02X%02X%02X' % (r(),r(),r())})
                        alreadysent_nodes.append(x['url'])

        for y in linkscol.find():
                if y not in alreadysent_links:
                        if y['source'] in alreadysent_nodes and y['target'] in alreadysent_nodes:
                                links.append({'source':y['source'], 'target': y['target']})
                                alreadysent_links.append(y)
        response = {'nodes':nodes, 'links':links}
        return json.dumps(response)



@app.route('/clear')
def crawl_clear():
        del alreadysent_nodes[:]
        del alreadysent_links[:]
        return 'cleared'

@app.route('/crawlviewer')
def get_data():
        nodes_data = []
        links_data = []
        nodeurls = []
        for x in nodescol.find():
                nodeurls.append(x['url'])
                nodes_data.append({'id':x['url'], 'title':x['title'], 'url':x['url'], 'color':'#%02X%02X%02X' % (r(),r(),r())})
        for y in linkscol.find():  
                if y['source'] in nodeurls and y['target'] in nodeurls:
                                                links_data.append({'source':y['source'], 'target': y['target']})
        response = {'nodes':nodes_data, 'links':links_data}
        return json.dumps(response)               