import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Home } from './routes/home';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
));
