import React, { Component } from 'react'
import { Glyphicon, Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import {base_path} from './constants'

const CrumbIconItem = ({to, glyph, children, ...props}) => (
  <LinkContainer to={to}>
    <Breadcrumb.Item {...props}>
      {glyph ? <span><Glyphicon glyph={glyph} /> {children}</span> : children}
    </Breadcrumb.Item>
  </LinkContainer>
)

export default CrumbIconItem

