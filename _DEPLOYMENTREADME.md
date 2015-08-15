This file is going to give a quick runthrough of what it takes to deploy this app. 

--------------------------------------------------------------------

To ensure that it can be tested locally, utilize npm install. It has been modified to also call bower install to ensure that all the dependencies are properly loaded when deployed. 

To create a new heroku app, use

		heroku create <appname>

This will create the new app and attach it to your heroku account. Then, use the command

		git push heroku master

to push the changes to the server. From there you will need to scale the app so that it is possible to run. To do this, run the command

		heroku ps:scale web=1

which will scale up the app so that it can be visited. To open the site up in the browser, use 
	
		heroku open

This will allow you to see your deployed version of the app online. 


This will only show you a very basic version of the app, which has not yet attached to the databases.

----------------------------------------------------------------------
 To add mongoDB use the following commands

		heroku addons:create mongolab

		heroku config | grep MONGOLAB_URI

The second command give you the config variable for the database. Take the Mongolab URI given by this and then run 

		heroku config:set PROD_MONGODB=<Mongolab URI>

-------------------------------------------------------------------
To set up mySQL use 

		heroku addons:create cleardb:ignite

		heroku config | grep CLEARDB_DATABASE_URL

		heroku config:set CLEARDB_DATABASE_URL= <Given CleardDB URl>
