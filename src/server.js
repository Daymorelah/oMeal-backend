import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import './helpers/strategies';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

if (app.get('env') !== 'test') {
  app.use(logger('dev'));
}

app.set('x-powered-by', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: 'GET,HEAD,PUT,POST,DELETE',
  credentials: true,
  exposedHeaders: process.env.CORS_EXPOSED_HEADERS,
}));

//routes
routes(app);

// Catch all invalid routes
app.all('*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Page not found',
  });
});

app.use((err, req, res, next) => {
  console.log('err is ==> ', err);
  res.status(500).json({
    code: 500,
    message: 'Something failed',
  });
  next();
})

app.listen(PORT, (error) => {
  if (error) {
    console.info(`An error occurred try to start the sever. Error is ${error}`); //eslint-disable-line
  } else {
    console.info(`Server is up and running on port ${PORT} ...`); //eslint-disable-line
  }
});

export default app;
