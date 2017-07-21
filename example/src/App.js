import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Grid } from 'react-bootstrap'

import BreadcrumbsSimple from './BreadcrumbsSimple';

import { BreadcrumbsItem } from '../..';

import Navbar from './Navbar'
import MainPage from './MainPage'
import ProfilePage from './ProfilePage'
import ToolsPage from './ToolsPage'

import {base_path} from './constants'


class App extends Component {
  render() {
    return (
      <div>
        <BreadcrumbsItem to={base_path}>
          Home Page
        </BreadcrumbsItem>

        <Navbar/>

        <BreadcrumbsSimple/>

        <Grid>
          <Route exact path='/' component={MainPage} />
          <Route exact path={`${base_path}`} component={MainPage} />
          <Route exact path={`${base_path}/profile`} component={ProfilePage} />
          <Route path={`${base_path}/tools`} component={ToolsPage} />
        </Grid>

        <BreadcrumbsSimple/>

      </div>
    );
  }
}

export default App;
