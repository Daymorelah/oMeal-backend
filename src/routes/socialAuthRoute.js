import passport from 'passport';
import SocialAuth from '../controllers/socialAuth';

const socialAuth = (app) => {
  app.get(
    '/api/v1/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    }),
  );
  app.get(
    '/api/v1/auth/google/callback',
    passport.authenticate('google', {
      session: false,
      failureRedirect: '/api/v1/auth/google/failed',
    }),
    SocialAuth.googleSignup,
  );
  app.get(
    '/api/v1/auth/google/failed',
    (req, res) => {
      res.send({
        message: 'Social authentication failed. You can try again.'
      });
    }
  );
}

export default socialAuth;
