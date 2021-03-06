const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',

    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // app.get('/api/current_user', (req, res) => {
  //   res.send(req.user);
  //   console.log(req.user);
  // });

  app.get('/api/current_user', async (req, res) => {
    try {
      const user = await res.send(req.user);
      // console.log(user);
    } catch (err) {
      // console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
};
