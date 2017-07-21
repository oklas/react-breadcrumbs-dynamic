import React, { Component } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import {base_path} from './constants'

import { Breadcrumbs } from '../..';

const Item = ({to, ...props}) => (
  <LinkContainer to={to}>
    <Breadcrumb.Item {...props}>
    </Breadcrumb.Item>
  </LinkContainer>
)

const BreadcrumbsSimple = () => (
  <Breadcrumbs
    container={Breadcrumb}
    item={Item}
    finalProps={{active: true}}
    duplicateProps={{to: 'href'}}
  />
)

export default BreadcrumbsSimple
