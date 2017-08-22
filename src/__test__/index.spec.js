import React from 'react'
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
  state = {
    profileUrl: "/user/profile"
  }
  render() {
    return (
      <BreadcrumbsProvider>
        <div>
          <Breadcrumbs />
          <BreadcrumbsItem to='/'>Home</BreadcrumbsItem>
          <BreadcrumbsItem to='/user'>User</BreadcrumbsItem>
          <BreadcrumbsItem to={this.state.profileUrl}>Profile</BreadcrumbsItem>
          <button onClick={()=>this.setState({profileUrl:"/user/settings"})}>
            Change Profile Url
          </button>
        </div>
      </BreadcrumbsProvider>
    )
  }
}

describe("breadcrumbs simple usage", function() {
  it("dom rendering", function() {
    jest.useFakeTimers()
    const wrapper = mount(<TestSimpleApp/>);
    jest.runAllTimers();
    expect(wrapper.find('a')).to.have.length(3);
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/profile')
    wrapper.find('button').simulate('click');
    jest.runAllTimers();
    expect(wrapper.find('a')).to.have.length(3);
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/settings')
  });
});

