import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// layout
import MainLayout from '../pages/MainLayout'

// pages
import Dashboard from '../pages/Dashboard'
import Page2 from '../pages/Page2'


export default (
  <Router history={browserHistory} >
    <Route component={MainLayout} >
      <Route path="/" component={Dashboard}/>
      <Route path="/page2" component={Page2}/>
    </Route>

  </Router>
)
