import React, { Component } from 'react'
import { Glyphicon, Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import {base_path} from './constants'

import { Breadcrumbs } from '../..';

const Item = ({to, glyph, ...props}) => (
  <LinkContainer to={to}>
    <Breadcrumb.Item {...props}>
    </Breadcrumb.Item>
  </LinkContainer>
)

const ItemWithIcon = ({to, glyph, children, ...props}) => (
  <LinkContainer to={to}>
    <Breadcrumb.Item {...props}>
      {glyph ? <span><Glyphicon glyph={glyph} /> {children}</span> : children}
    </Breadcrumb.Item>
  </LinkContainer>
)

export const BreadcrumbsSimple = () => (
  <Breadcrumbs
    container={Breadcrumb}
    item={Item}
    finalProps={{active: true}}
    duplicateProps={{to: 'href'}}
  />
)

export const BreadcrumbsWithIcon = () => (
  <Breadcrumbs
    container={Breadcrumb}
    item={ItemWithIcon}
    finalProps={{active: true}}
    duplicateProps={{to: 'href'}}
  />
)
