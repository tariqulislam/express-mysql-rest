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
        {
                firstName: 'example name',
                lastName: 'example last name,
                email: 'example email'
        }

## Create the New Model for Application

```$ sequelize model:create --name User --attributes firstName:string, lastName:string, email:string```

this command will create the model file with migration file at `db` folder.those are file name are based on model name
        1. db/model/<model>.js file
        2. db/migration/ <date>-create-user.js

### Example of model file is
```javascript
'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Comment,{
      foreignKey: 'userId',
      as: 'comments'
    });

  };
  return User;
};
```
### Example of migration file is
```javascript
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
```
at migration two field are automatically added. those are ```createdAt``` and ```updatedAt``` field. then we need to migrate model to database just run the command ```yarn db:migrate``` or ```npm run db:migrate``` to create table at database and ORM mapping purpose.

## Create the controller for Rest api

For controller we have to create the ```controller``` folder to root of the application. for example purpose ```users.js``` file is created. that controller control all the business logic of the application. We will export the different function from controller file.

#### For GET Api example code will be
```javascript
  list(req, res) {
        return user
        .all()
        .then(users => res.status(200).json(ResponseFormat.build(
            users,
            "User Information Reterive successfully",
            200,
            "success"
        )))
        .catch(error => res.status(400).send(ResponseFormat.build(
            error,
            "Somthing went wrong when Reterieve Information",
            400,
            "error"
        )));
    }
```
#### For POST Api example code will be
```javascript
 create(req, res) {
        return user
        .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        })
        .then(user => res.status(201).json(ResponseFormat.build(
            user,
            "User Create Successfully",
            201,
            "success"
        )))
        .catch(error => res.status(400).json(ResponseFormat.error(
            error,
            "Something went wrong when create Users",
            "error"
        )))
    },
```
## Routing the Api

For Api routing purpose i have added the ```index.js``` file to ```routes`` folder, and to routing the api we should use this code

```javascript
const userController = require('../controllers').users
const commentController = require('../controllers').comments

module.exports = (app) => {
  app.post('/api/users', userController.create);
  app.get('/api/users', userController.list);
}
```
If you want to add the other controller to routes. just add the controller by Import
the controller module:

```javascript
const [ControllerName] = require(/* Import the file */).[Export Module Name]
```
then call the funtions inside the ```module.exports```:
```javascript
app.<REST API COSUME METHOD>(<API END POINT>, <CONTROLLER NAME>.<METHOD>)
```
It's so easy and minimal code and configuration to create the rest api with mysql and express. you can use this to your project for starter.

###sample test script with ```Mocha``` and ```Chai```

1. Create the folder ```test``` at root directory
2. Create the file named ```user.js``` at ```test``` folder

For testing with ```Mocha``` and ```Chai``` we have just add the ```Mocha``` globally
```javascript
> npm install -g mocha
```
At the ```user.js``` file i have provide you the sample testing script for api testing.

For testing purpose we have change Node js environment variable at ```user.js``` file
```javascript
process.env.NODE_ENV = "test"
```
Then we have to add the model which will be use for testing
```javascript
const User = require('../db/models').User;
```
Then add the ```chai``` and ```chai-http``` package for testing the api server. for testing with api server we need to
add main `js` file ```app.js``` as server 
```javascript
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp)
```
### [GET] /users testing:
```javascript
describe('/GET user', () => {
    it('it should Get all users', (done) => {
        chai.request(app)
        .get('/api/users')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});
```
### [POST] /users testing:
```javascript
describe('/POST user', () => {
    it('it sould post the user info', (done) => {
        const user = {
            firstName: " Husne Ara",
            lastName: "Asma",
            email: "asma@gmail.com"
        };

        chai.request(app)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.should.have.property('message');
            res.body.should.have.property('statusType').eq('success');
            done();
        });
    });
});
```

### [PUT] /user Testing:
```javascript
describe('/PUT/:id user', () => {
    it("should not update the user info", (done) => {
        const user = {
            firstName: "Mr.",
            lastName: "Himu",
        }
        const userId = 2;
         chai.request(app)
         .put('/api/users/'+ userId)
         .send(user)
         .end((err, res) => {
             res.should.have.status(404);
             res.body.should.be.a('object');
             res.body.should.have.property('message');
             res.body.should.have.property('statusType').eq('error');
             done();
         });
    });
});
```
