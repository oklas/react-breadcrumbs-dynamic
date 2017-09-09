import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

export default function spec(TestApp) {

describe("breadcrumbs simple usage", function() {
  it("can replace prop `to`", function() {
    jest.useFakeTimers()
    const wrapper = mount(<TestApp/>)
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
    const wrapper = mount(<TestApp/>)
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
    const wrapper = mount(<TestApp separator={<a>/</a>} />)
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
    const wrapper = mount(<TestApp renameProps={{to:"href"}} />);
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
    const wrapper = mount(<TestApp duplicateProps={{to:"href"}} />);
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


} // spec()