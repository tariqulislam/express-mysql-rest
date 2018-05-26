

const userController = require('../controllers').users
const commentController = require('../controllers').comments

module.exports = (app) => {
  app.post('/api/users', userController.create);
  app.get('/api/users', userController.list);
  app.post('/api/comments/:userId/comment', commentController.create);
  app.get('/api/users/comments', userController.listWithComment);
  app.get('/api/users/:userId', userController.getUserDetails);
  app.put('/api/users/:userId', userController.update);
  app.delete('/api/users/:userId', userController.destroy);
}
/* GET home page. */
