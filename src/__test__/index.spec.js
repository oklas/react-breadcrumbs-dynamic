import React from 'react'
import PropTypes from 'prop-types'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

import {
  BreadcrumbsProvider,
  Breadcrumbs,
  BreadcrumbsItem,
  withBreadcrumbs,
} from '../index';

import spec from './index.spec-set'


jest.dontMock('../index')

class TestSimpleApp extends React.Component {
  static propTypes = {
    method: PropTypes.string,
    separator: PropTypes.node,
    renameProps: PropTypes.object,
    duplicateProps: PropTypes.object,
  }

  state = {
    profileUrl: "/user/profile",
    haveProfile: true,
  }

  changeProfileUrl = () => {
    this.setState({profileUrl: "/user/settings"})
  }

  restoreProfileUrl = () => {
    this.setState({profileUrl: "/user/profile"})
  }

  removeProfile = () => {
    this.setState({haveProfile: false})
  }

  render() {
    return (
      <BreadcrumbsProvider>
        <div>
          <Breadcrumbs
            separator={this.props.separator}
            renameProps={this.props.renameProps}
            duplicateProps={this.props.duplicateProps} />
          <BreadcrumbsItem to='/'>Home</BreadcrumbsItem>
          <BreadcrumbsItem to='/user'>User</BreadcrumbsItem>
          { this.state.haveProfile
            ? <BreadcrumbsItem to={this.state.profileUrl}>Profile</BreadcrumbsItem>
            : null
          }
          <button className="changeProfileUrl" onClick={this["changeProfileUrl"]} />
          <button className="restoreProfileUrl" onClick={this["restoreProfileUrl"]} />
          <button className="removeProfile" onClick={this["removeProfile"]} />
        </div>
      </BreadcrumbsProvider>
    )
  }
}


spec(TestSimpleApp)

