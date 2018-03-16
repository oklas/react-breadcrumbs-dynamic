import React, { Component } from 'react'
import { MenuItem } from 'react-bootstrap'

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

export default GithubItem