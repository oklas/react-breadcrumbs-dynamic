import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Panel } from 'react-bootstrap'

import { Events, Statistics, Settings } from './ToolsPages'

import { BreadcrumbsItem } from '../../src';

import {base_path} from './constants'


const Tools = ({children}) => (
  <div>
    <BreadcrumbsItem glyph='cog' to={base_path+'/tools'}>
      <b>Tools</b>
    </BreadcrumbsItem>

    <h1>Tools</h1>

    <Panel>
     <Switch>
        <Route exact path={`${base_path}/tools/events`} component={Events} />
        <Route exact path={`${base_path}/tools/statistics`} component={Statistics} />
        <Route exact path={`${base_path}/tools/settings`} component={Settings} />
        <Route render={()=><b>Choose tool from menu</b>}/>
     </Switch>
    </Panel>
  </div>
)

export default Tools
