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


describe("breadcrumbs simple usage", function() {
  it("can replace prop `to`", function() {
    jest.useFakeTimers()
    const wrapper = mount(<TestSimpleApp/>)
    jest.runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/profile')
    wrapper.find('.changeProfileUrl').simulate('click')
    jest.runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/settings')
    wrapper.find('.restoreProfileUrl').simulate('click')
    jest.runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/profile')
    wrapper.find('.changeProfileUrl').simulate('click')
    jest.runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/settings')
    wrapper.find('.restoreProfileUrl').simulate('click')
    jest.runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/profile')
  });

  it("can remove item", function() {
    jest.useFakeTimers()
    const wrapper = mount(<TestSimpleApp/>)
    jest.runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/profile')
    wrapper.find('.removeProfile').simulate('click')
    jest.runAllTimers()
    expect(wrapper.find('a')).to.have.length(2)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
  });

  it("can render separator", function() {
    jest.useFakeTimers()
    const wrapper = mount(<TestSimpleApp separator={<a>/</a>} />)
    jest.runAllTimers()
    expect(wrapper.find('a')).to.have.length(5)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().children).to.equal('/')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user')
    expect(wrapper.find('a').at(3).props().children).to.equal('/')
    expect(wrapper.find('a').at(4).props().to).to.equal('/user/profile')
  });

  it("can rename props", function() {
    jest.useFakeTimers()
    const wrapper = mount(<TestSimpleApp renameProps={{to:"href"}} />);
    jest.runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props()).to.not.have.property("to")
    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    expect(wrapper.find('a').at(1).props()).to.not.have.property("to")
    expect(wrapper.find('a').at(1).props().href).to.equal('/user')
    expect(wrapper.find('a').at(2).props()).to.not.have.property("to")
    expect(wrapper.find('a').at(2).props().href).to.equal('/user/profile')
  });

  it("can duplicate props", function() {
    jest.useFakeTimers()
    const wrapper = mount(<TestSimpleApp duplicateProps={{to:"href"}} />);
    jest.runAllTimers();
    expect(wrapper.find('a')).to.have.length(3);
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(1).props().href).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/profile')
    expect(wrapper.find('a').at(2).props().href).to.equal('/user/profile')
  });
});
