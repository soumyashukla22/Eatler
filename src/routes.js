import React from 'react';
import { Router } from 'react-router';


const rootRoute = {
  childRoutes: [{
    path: '/',
    component: require('./components/App').default,
    childRoutes: [
      require('./components/About').default
    ]
  }]
};

const Routes = (props) => (
  <Router {...props} routes={rootRoute} />
);

export default Routes;
