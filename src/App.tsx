import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import { createStore } from 'redux';
import { StoreContext } from 'redux-react-hook';
import { devToolsEnhancer } from 'redux-devtools-extension';

import 'bootswatch/dist/minty/bootstrap.css';

import rootReducer from './store';
import Layout from './views/Layout';

const store = createStore(
  rootReducer,
  devToolsEnhancer({}),
);

const AppRouter: React.FC = () => (
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <Layout>
        <div>hello world</div>
      </Layout>
    </BrowserRouter>
  </StoreContext.Provider>
);

export default AppRouter;
