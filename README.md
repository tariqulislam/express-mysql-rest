# express-mysql-rest
Boilerplate for building the rest api with sequelize and mysql using express js. the repository will contains crud operation with mysql database using sequelize ORM.

For front end development purpose we need to example api server to design site or for practice of ```angular``` and ```react js``` or ```vue.js``` or other front end framework. we need to primary backend server. the repository is created for who are learning the server side development with node js and using as example api server for front and development. we can also use this for our production development purpose also. 

## Prerequisite
 1. Express JS
 2. mysql2
 3. sequelize-cli
 4. sequelize
 5. nodemon
 6. doenv

## Installation
 1. clone the repository ```git clone https://github.com/tariqulislam/express-mysql-rest.git```
 2. install the ```sequelize cli``` for support ORM command
         For `npm` package: ```npm install -g sequelize-cli```
         For `yarn` package: ```yarn add global sequelize-cli```

 3. run command for npm ```npm install```  and for yarn ```yarn install```
 4. create database to mysql, if you use command line, command will be
    ```>mysql -u <username> -p <password> ```
    ```mysql> create DATABASE test_dev```
    ```mysql> exit```
 5. then use command for migrate the database
        1. for Yarn command : ```yarn db:migrate```
        2. for npm command  : ```npm run db:migrate```
 6. For development purpose user command ```yarn start:dev```

 ## Predefiend api endpoint

 1. For consuming the get api or list for user ```[GET]http://localhost:3000/api/users``` 
 2. For posting the data to api ```[POST]http://localhost:3000/api/users``` 
    Request Body: 
    ```{
       firstName: <name>,
       lastName: <lastname>,
       email: <email>
    }```

