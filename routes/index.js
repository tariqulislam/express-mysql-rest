

const userController = require('../controllers').users

module.exports = (app) => {
  app.post('/api/users', userController.create);
  app.get('/api/users', userController.list);
}
/* GET home page. */
