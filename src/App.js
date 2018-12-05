import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Grid, Breadcrumb as BootstrapBreadcrumb } from 'react-bootstrap'
import { Breadcrumbs, BreadcrumbsItem } from '../../src';

import CrumbItem from './CrumbItem';
import CrumbIconItem from './CrumbIconItem';

import Navbar from './Navbar'
import MainPage from './MainPage'
import ProfilePage from './ProfilePage'
import ToolsPage from './ToolsPage'

import {base_path} from './constants'


class App extends Component {
  render() {
    return (
      <div>
        <BreadcrumbsItem glyph='home' to={base_path}>
          Home Page
        </BreadcrumbsItem>

        <Navbar/>

        <Breadcrumbs
          item={CrumbIconItem}
          container={BootstrapBreadcrumb}
          finalProps={{active: true}}
          duplicateProps={{to: 'href'}}
       />

        <Grid>
          <Route exact path='/' component={MainPage} />
          <Route exact path={`${base_path}`} component={MainPage} />
          <Route exact path={`${base_path}/profile`} component={ProfilePage} />
          <Route path={`${base_path}/tools`} component={ToolsPage} />
        </Grid>

        <Breadcrumbs
          item={CrumbItem}
          container={BootstrapBreadcrumb}
          finalProps={{active: true}}
          duplicateProps={{to: 'href'}}
        />

      </div>
    );
  }
}

export default App;
