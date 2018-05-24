

const userController = require('../controllers').users
const commentController = require('../controllers').comments

module.exports = (app) => {
  app.post('/api/users', userController.create);
  app.get('/api/users', userController.list);

  app.post('/api/comments/:userId/comment', commentController.create )
}
/* GET home page. */
