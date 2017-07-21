import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Panel } from 'react-bootstrap'

import { Events, Statistics, Settings } from './ToolsPages'

import {base_path} from './constants'

const Tools = ({children}) => (
  <div>
    <h1>Tools</h1>

    <Panel>
      <Route exact path={`${base_path}/tools/events`} component={Events} />
      <Route exact path={`${base_path}/tools/statistics`} component={Statistics} />
      <Route exact path={`${base_path}/tools/settings`} component={Settings} />
    </Panel>
  </div>
)

export default Tools
