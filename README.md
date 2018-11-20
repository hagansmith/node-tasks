# Node-Tasks
> tasks Single Page App with node.js backend
![node-tasks](https://github.com/hagansmith/node-tasks/blob/master/node-tasks.png)

## Server Setup
``` bash
Navigate to the the api directory

# install dependencies
npm install

# setup mySQL
setup mySQL db with tasks table see models folder or use sequelize migrations

# update connection
rename api/db.example.js to api/db.js and update the database, username and, password

#run server
node server.js

watching on localhost:3000
```

## Client Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

browser should open to localhost:8080

# build for production with minification
npm run build
```