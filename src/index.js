import React from 'react'
import ReactDOM from 'react-dom'

import Routes from './app/routes'

import 'materialCss'
import 'fontAwesome'
import 'mainStyle'

import Dashboard from './pages/Dashboard';

ReactDOM.render(
  <div>{Routes}</div>,
  document.getElementById('app')
)
