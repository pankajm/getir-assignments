# Getir-assignment

This assignement is to connect to remote mongodb instance, fetch data and serve it to client as per conditions in the request body of a POST API 


## Tech stack and Assumption

The application is written in **Node JS** with **Express** as framework and serves data from **MongoDB**. The units test cases are writen using **Jest**.

**Assumption:-** The code does not create or change any collection in remote db instance. It assumes that there is already a collection of documents having data in below format

**{"_id":"5ee21587e07f053f990ceafd"},"key":"hCXxyuAu","value":"hfJAfcGGizzJ","createdAt":{"$date":"2015-11-28T11:47:29.706Z"},"counts":[864,509,712]}**


## Hosting

This app is hosted on **heroku** platform. The url to access the api, its payload and sample response is explained in below section

## API details 

you can use below curl to hit the remotely hosted api or you can try it from Rest client ex- postman 

### Rest Client 
#### URL - https://powerful-badlands-50479.herokuapp.com/api/getRecords
#### Method - Post
#### Sample Payload - 	
  *{
		"startDate": "2016-01-26",
		"endDate": "2016-06-02",
		"minCount": 1,
		"maxCount": 50
	}*
  
  ### OR
  #### Copy and paste following curl in terminal


*curl -X POST \
  https://powerful-badlands-50479.herokuapp.com/api/getRecords \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: c02f4b8e-4686-7f4f-27b6-edb987c4247f' \
  -d '	{
		"startDate": "2016-01-26",
		"endDate": "2016-06-02",
		"minCount": 1,
		"maxCount": 50
	}'*
  
  
## Running App locally

Follow below commands to run app on local machine

*git clone https://github.com/pankajm/getir-assignments.git*

go to project directory and run following command

*npm install*

set enviroment variables (bash and zsh)

*export getir_records_db=mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true*

Finally Run the app

*node index.js*

Open the Rest client and hit api using above payload with following url 

*http://localhost:3000/api/getRecords*

## Integration testing

You will need to install mongodb locally to run integration test. Once the mongodb is installed on your machine,
simply run mongo demon using command *mongod* and  Run the app using below command to check integration test results

*npm test*

**Done**
  
  
  
 


