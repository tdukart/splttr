import * as React from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import 'bootswatch/dist/minty/bootstrap.css';

import Layout from './components/Layout';
import client from './apollo';
import SignedOutLobby from './components/SignedOutLobby';
import UserLogin from './components/UserLogin';
import UserCreate from './components/UserCreate';

const AppRouter: React.FC = () => (
  <ApolloProvider client={client}>
    <HashRouter>
      <Layout>
        <Route path="/" exact component={SignedOutLobby} />
        <Route path="/account">
          <Switch>
            <Route path="/account/login" exact component={UserLogin} />
            <Route path="/account/login/token/:loginToken" component={UserLogin} />
            <Route path="/account/create" component={UserCreate} />
          </Switch>
        </Route>
      </Layout>
    </HashRouter>
  </ApolloProvider>
);

export default AppRouter;
