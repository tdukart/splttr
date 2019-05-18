import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import { createStore } from 'redux';
import { StoreContext } from 'redux-react-hook';


import 'bootswatch/dist/sandstone/bootstrap.css';

import rootReducer from './store';
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  devToolsEnhancer({}),
);

const AppRouter: React.FC = () => (
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <Container fluid>
        <div>navbar</div>
      </Container>
    </BrowserRouter>
  </StoreContext.Provider>
);

export default AppRouter;
