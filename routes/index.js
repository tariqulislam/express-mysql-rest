

const userController = require('../controllers').users

module.exports = (app) => {
  app.post('/api/users', userController.create);
  
}
/* GET home page. */
