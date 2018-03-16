import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {base_path} from '../constants'

const itemFactory = Component => ({to, glyph, children, ...props}) => (
  <LinkContainer to={to||base_path}>
    <Component {...props}>
      { glyph && <Glyphicon glyph={glyph} /> }
      { children }
    </Component>
  </LinkContainer>
)

export default itemFactory