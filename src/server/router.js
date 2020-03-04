const authController = require('./controllers/auth_controller');
const bootstrapController = require('./controllers/bootstrap_controller');
const groupController = require('./controllers/group_controller');
const userGroupsController = require('./controllers/user_groups_controller');
const groupMessagesController = require('./controllers/group_messages_controller');
const middleware = require('./middleware');

module.exports = (app, passport) => {
  /**
   * Auth sign in
   */
  app.get('/auth/google', (req, res, next) => {
    authController.signIn(req, res, next, passport);
  });

  /**
   * Auth sign out
   */
  app.get('/auth/sign_out', authController.signOut);

  /**
   * Auth callback
   */
  app.get('/auth/google/callback', (req, res, next) => {
    authController.handleCallback(req, res, next, passport);
  });

  /**
   * Auth sign out
   */
  app.get('/auth/sign_out', authController.signOut);

  /**
   * Groups
   */
  app.get(
    '/api/group/:id',
    middleware.isAuthenticated,
    middleware.isValidJwt,
    groupController.GET,
  );
  app.get(
    '/api/me/groups',
    middleware.isAuthenticated,
    middleware.isValidJwt,
    userGroupsController.GET,
  );
  app.post(
    '/api/me/groups',
    middleware.isAuthenticated,
    middleware.isValidJwt,
    userGroupsController.POST,
  );

  /**
   * Messages
   */
  app.post(
    '/api/group/:id/messages',
    middleware.isAuthenticated,
    middleware.isValidJwt,
    groupMessagesController.POST,
  );
  app.get(
    '/api/group/:id/messages',
    middleware.isAuthenticated,
    middleware.isValidJwt,
    groupMessagesController.GET,
  );

  /**
   * Serve React app
   */
  app.get('*', bootstrapController.init);
};
