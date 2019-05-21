import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import 'bootswatch/dist/minty/bootstrap.css';

import Layout from './components/Layout';
import client from './apollo';
import UserCreate from './components/UserCreate';

const AppRouter: React.FC = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Layout>
        <UserCreate />
      </Layout>
    </BrowserRouter>
  </ApolloProvider>
);

export default AppRouter;
