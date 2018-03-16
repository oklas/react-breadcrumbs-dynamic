import React, { Component } from 'react'
import { Glyphicon, Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import {base_path} from './constants'

const CrumbItem = ({to, glyph, ...props}) => (
  <LinkContainer to={to}>
    <Breadcrumb.Item {...props}>
    </Breadcrumb.Item>
  </LinkContainer>
)

export default CrumbItem
