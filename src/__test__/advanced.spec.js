import React from 'react'
import PropTypes from 'prop-types'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

import {
  BreadcrumbsProvider,
  Breadcrumbs,
  Dummy as Item,
  withBreadcrumbsItem,
} from '../index'

import spec from './index.spec-set'


jest.dontMock('../index')


@withBreadcrumbsItem
class WithBreadcrubmsItems extends React.Component {
  static propTypes = {
    breadcrumbs: PropTypes.object,
    haveProfile: PropTypes.bool,
    profileUrl: PropTypes.string,
    reactComponentInProps: PropTypes.bool,
  }

  componentWillMount() {
    this.configureBreadcrumbs(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const keys = Object.keys(nextProps).concat(Object.keys(this.props))
    const skip = ['breadcrumbs']
    const differences = keys.filter(
      k => (!skip.includes(k) && this.props[k] !== nextProps[k])
    ).length
    if( differences ) {
      this.configureBreadcrumbs(nextProps)
    }
  }

  configureBreadcrumbs = (props) => {
    if(props.noAnyItem) {
      props.breadcrumbs.item(null)
    } else if(props.onlyOneItem) {
      props.breadcrumbs.item(
        <Item to='/'>Home</Item>
      )
    } else {
      const Home = this.props.reactComponentInProps ? <b>Home</b> : 'Home'
      props.breadcrumbs.items(
        <div>
          <Item to='/'>{Home}</Item>
          <Item to='/user'>User</Item>
          { props.haveProfile
            ? <Item to={props.profileUrl}>Profile</Item>
            : null
          }
        </div>
      )
    }
  }

  testWrongInstallToKey = () => {
    this.props.breadcrumbs.install([], {})
  }

  testWrongInstallPropsType = () => {
    this.props.breadcrumbs.install(new String('/'), [])
  }

  render() {
    return (
      <div>
        <button className="testWrongInstallToKey" onClick={this["testWrongInstallToKey"]} />
        <button className="testWrongInstallPropsType" onClick={this["testWrongInstallPropsType"]} />
      </div>
    )
  }
}


class TestAdvancedAppComponent extends React.Component {
  static propTypes = {
    breadcrumbs: PropTypes.object,
    method: PropTypes.string,
    separator: PropTypes.node,
    renameProps: PropTypes.object,
    duplicateProps: PropTypes.object,
    onlyOneItem: PropTypes.bool,
    noAnyItem: PropTypes.bool,
    reactComponentInProps: PropTypes.bool,
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
      <div>
        <Breadcrumbs
          separator={this.props.separator}
          container={this.props.container}
          containerProps={this.props.containerProps}
          renameProps={this.props.renameProps}
          duplicateProps={this.props.duplicateProps} />
        <WithBreadcrubmsItems {...this.props} {...this.state}/>
        <button className="changeProfileUrl" onClick={this["changeProfileUrl"]} />
        <button className="restoreProfileUrl" onClick={this["restoreProfileUrl"]} />
        <button className="removeProfile" onClick={this["removeProfile"]} />
      </div>
    )
  }
}

const TestAdvancedApp = (props) => (
  <BreadcrumbsProvider
    shouldBreadcrumbsUpdate={props.shouldBreadcrumbsUpdate}
  >
    <TestAdvancedAppComponent {...props}/>
  </BreadcrumbsProvider>
)

TestAdvancedApp.propTypes = {
  shouldBreadcrumbsUpdate: PropTypes.func,
}



spec(TestAdvancedApp, true)

