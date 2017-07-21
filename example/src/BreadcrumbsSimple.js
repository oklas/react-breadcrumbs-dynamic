import React, { Component } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import {base_path} from './constants'

import { Breadcrumbs } from '../..';

const Item = ({href, ...props}) => (
  <LinkContainer to={href}>
    <Breadcrumb.Item {...props}>
    </Breadcrumb.Item>
  </LinkContainer>
)

const BreadcrumbsSimple = () => (
  <Breadcrumbs
    container={Breadcrumb}
    item={Item}
    finalProps={{active:true}}
  />
)

export default BreadcrumbsSimple
