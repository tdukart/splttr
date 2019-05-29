import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import 'bootswatch/dist/minty/bootstrap.css';

import Layout from './components/Layout';
import client from './apollo';
import SignedOutLobby from './components/SignedOutLobby';
import UserLogin from './components/UserLogin';
import UserCreate from './components/UserCreate';

const AppRouter: React.FC = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Layout>
        <Route path="/" exact component={SignedOutLobby} />
        <Route path="/login" component={UserLogin} />
        <Route path="/newaccount" component={UserCreate} />
      </Layout>
    </BrowserRouter>
  </ApolloProvider>
);

export default AppRouter;
