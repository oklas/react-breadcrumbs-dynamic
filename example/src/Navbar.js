import React, { Component } from 'react'
import {
  Glyphicon,
  Navbar,
  Nav,
  NavDropdown,
  NavItem as NItem,
  MenuItem as MItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import {base_path} from './constants'


const NavItem = ({to, ...props}) => (
  <LinkContainer to={to||base_path}>
    <NItem {...props}></NItem>
  </LinkContainer>
)


const MenuItem = ({to, ...props}) => (
  <LinkContainer to={to||base_path}>
    <MItem {...props}></MItem>
  </LinkContainer>
)

const GithubItem = ({to, action, key, icon}) => (
  <MenuItem eventKey={key}>
    <a className="github-button" data-icon={icon} data-show-count="true"
      href={to}
      aria-label={action+" oklas/react-breadcrumbs-dynamic on GitHub"}
    >
      {action}
    </a>
  </MenuItem>
)



const TheNavbar = ({children}) => (
  <Navbar inverse collapseOnSelect>

    <Navbar.Header>
      <Navbar.Brand>
        <a href="//github.com/oklas/react-breadcrumbs-dynamic">
          react-breadcrumbs-dynamic
        </a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>

    <Navbar.Collapse>
      <Nav>

        <NavItem eventKey={1} to={base_path}>
          <Glyphicon glyph="home" /> Home
        </NavItem>
        <NavItem eventKey={2} to={base_path+'/profile'}>
          <Glyphicon glyph="user" /> Profile
        </NavItem>
        <NavDropdown eventKey={3} id="basic-nav-dropdown"
          title={
            <span><Glyphicon glyph="cog" /> Tools</span>
          }
        >
          <MenuItem eventKey={3.2} to={base_path+'/tools/events'}>
            <Glyphicon glyph="calendar" /> Events
          </MenuItem>
          <MenuItem eventKey={3.1} to={base_path+'/tools/statistics'}>
            <Glyphicon glyph="signal" /> Statistics
          </MenuItem>
          <MenuItem eventKey={3.3} to={base_path+'/tools/settings'}>
            <Glyphicon glyph="wrench" /> Settings
          </MenuItem>
        </NavDropdown>

      </Nav>
      <Nav pullRight>

        <GithubItem key={1} action='Star' icon='octicon-star'
          to='https://github.com/oklas/react-breadcrumbs-dynamic'
        />
        <GithubItem key={2} action='Fork' icon='octicon-repo-forked'
          to='https://github.com/oklas/react-breadcrumbs-dynamic/fork'
        />

      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default TheNavbar

