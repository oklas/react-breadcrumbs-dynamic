import React from 'react'
import PropTypes from 'prop-types'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

import {
  BreadcrumbsProvider,
  Breadcrumbs,
  BreadcrumbsItem,
} from '../index'

import spec from './index.spec-set'


jest.dontMock('../index')


class TestSimpleApp extends React.Component {
  static propTypes = {
    method: PropTypes.string,
    separator: PropTypes.node,
    renameProps: PropTypes.object,
    duplicateProps: PropTypes.object,
    onlyOneItem: PropTypes.bool,
    noAnyItem: PropTypes.bool,
    reactComponentInProps: PropTypes.bool,
    shouldBreadcrumbsUpdate: PropTypes.func,
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

  testWrongInstallToKey = () => {
    this.props.breadcrumbs.install([], {})
  }

  testWrongInstallPropsType = () => {
    this.props.breadcrumbs.install(new String('/'), [])
  }

  render() {
    const onlyOneItem = this.props.noAnyItem || this.props.onlyOneItem
    const noFirstItem = this.props.noAnyItem
    const Home = this.props.reactComponentInProps ? <b>Home</b> : 'Home'
    return (
      <BreadcrumbsProvider
        shouldBreadcrumbsUpdate={this.props.shouldBreadcrumbsUpdate}
      >
        <div>
          <Breadcrumbs
            separator={this.props.separator}
            container={this.props.container}
            containerProps={this.props.containerProps}
            renameProps={this.props.renameProps}
            duplicateProps={this.props.duplicateProps} />
          { !noFirstItem ?
            <BreadcrumbsItem to='/'>{Home}</BreadcrumbsItem>
            : null
          }
          { !onlyOneItem ?
            <BreadcrumbsItem to='/user'>User</BreadcrumbsItem>
            : null
          }
          { !onlyOneItem && this.state.haveProfile ?
            <BreadcrumbsItem to={this.state.profileUrl}>
              Profile
            </BreadcrumbsItem>
            : null
          }
          <button className="changeProfileUrl" onClick={this["changeProfileUrl"]} />
          <button className="restoreProfileUrl" onClick={this["restoreProfileUrl"]} />
          <button className="removeProfile" onClick={this["removeProfile"]} />
          <button className="testWrongInstallToKey" onClick={this["testWrongInstallToKey"]} />
          <button className="testWrongInstallPropsType" onClick={this["testWrongInstallPropsType"]} />
        </div>
      </BreadcrumbsProvider>
    )
  }
}


spec(TestSimpleApp)

