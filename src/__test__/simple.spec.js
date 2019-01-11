import React from 'react'
import PropTypes from 'prop-types'
import enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'

import {
  BreadcrumbsProvider,
  Breadcrumbs,
  BreadcrumbsItem,
  breadcrumbsThroughArea as throughArea,
} from '../index'

import spec from './index.spec-set'


enzyme.configure({ adapter: new Adapter() });
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
    replaceAnotherSame: false,
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

  replaceAnotherSame = () => {
    this.setState({replaceAnotherSame: true})
  }

  render() {
    const onlyOneItem = this.props.noAnyItem || this.props.onlyOneItem
    const noFirstItem = this.props.noAnyItem
    const Home = this.props.reactComponentInProps ? <b>Home Bold</b> : 'Home'
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
            duplicateProps={this.props.duplicateProps}
            hideIfEmpty={this.props.hideIfEmpty}
          />
          { !noFirstItem ?
            ( this.state.replaceAnotherSame
               ? <div> <BreadcrumbsItem to='/'>Home Another</BreadcrumbsItem> </div>
               : <div> <BreadcrumbsItem to='/'>{Home}</BreadcrumbsItem> </div>
            )
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
          <button className="replaceAnotherSame" onClick={this["replaceAnotherSame"]} />
        </div>
      </BreadcrumbsProvider>
    )
  }
}


spec(TestSimpleApp)

