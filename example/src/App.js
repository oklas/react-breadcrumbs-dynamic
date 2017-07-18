import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'

import { Breadcrumbs } from '../..';

import Navbar from './Navbar'


class App extends Component {
  render() {
    return (
      <div>

        <Navbar/>

        <Breadcrumbs
        />

        <Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
