# Intellias Test Service Initial Setup

### This is a test project. Here could be a lot of mistakes and a big field for improvements (I didn't pay attentions to input field validation or 
### protection from sql injections).  
### As database I choose SQLight because for test you don't need to install some db like MySQL or PostgreSQL, all data stores in file

## 1. Install dependencies
``` bash
$ npm install # Or yarn install
```

## 2 Migrate database data
``` bash
$ npm run createDB
```

## 4. Start process for service
``` bash
$ npm run start
```

## 5. Navigate to the documentation 
[http://localhost:4201/swagger/api-docs/](http://localhost:4201/swagger/api-docs/)

Swagger json configuration [http://localhost:4201/swagger/api-docs/swagger.json](http://localhost:4201/swagger/api-docs/swagger.json)

## 6. Microservice base url
[http://localhost:4201/events](http://localhost:4201/events)


## The microservice exposes REST APIs which are documented using [Swagger](http://swagger.io/) in an [Express](https://expressjs.com/)
