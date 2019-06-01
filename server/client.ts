import * as express from 'express';
import * as webpack from 'webpack';
import * as  webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';

const app = express();

const mode = (process.env.NODE_ENV === 'developement') ? 'development' : 'production';

app.use(webpackMiddleware(webpack([webpackConfig(mode)])));

process.env.FRONTEND_URL = 'http://localhost:8000';

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('Client started on port 8000');
});
