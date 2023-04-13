## Node Express Todo CRUD App.

### To run Locallly
##### Installtion Steps
- Use node version(LTS) should be `v16.16.0`
- Don't change/override package.json
- Please make sure you do not push package-lock.json

```
- run `npm install / npm i` to install the node modules.
- run `npm install nodemon/ npm i nodemon` to install the nodemon.
- run `npm run start` to start the backend server.
```
### Routes- To be Executed with the help of POSTMAN/Thunder Client.

##### GET
- endpoint`/`.
- gets all the todos from db.json as a response.

##### POST
- endpoint`/`.
- take an object as a request body 
    - eg. `{"id":1,"task":"learn Node","status": true}` make sure id always be numeric.
    - While making POST request, make sure you are giving unique ID for each todo.
- return's response with status code "200" and the updated status of the todos.

`While making PUT, PATCH OR DELETE REQUEST you need to provide ID of that todo in url.`

##### PUT
- endpoint `/id`.
- if the id is valid 
    - take an object conatining values that you want to PUT as a request body, 
        eg. `{"id":1,"task":"learn Node","status": true}` make sure id always be numeric.
    - should return's response with status code "200" and the updated status of the todos.
- otherwise 
    - return a response with status code "400" and `"Invalid argument"`.

##### PATCH
- endpoint `/id`.
- if the id is valid 
    - take an object conatining values that you want to PATCH as a request body, 
        eg. `{"id":1,"task":"learn Node","status": true}` make sure id always be numeric.
    - should return's response with status code "200" and the updated status of the todos.
- otherwise 
    - return a response with status code "400" and `"Invalid argument"`.

##### DELETE
- endpoint `/id`.
- if the id is valid 
    - should return's response with status code "200" and the updated status of the todos.
- otherwise 
    - return a response with status code "400" and `"Invalid argument"`.

