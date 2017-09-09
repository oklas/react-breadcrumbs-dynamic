import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'
import { Dummy, Item } from '../index';

export default function spec(TestApp, advanced) {

const runAllTimers = advanced ? () => {} : () => jest.runAllTimers()
const useFakeTimers = advanced ? () => {} : () => jest.useFakeTimers()
const usage = advanced ? 'advanced' : 'simple'


describe(`breadcrumbs ${usage} usage`, function() {
  it("can replace prop `to`", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp/>)
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/profile')
    wrapper.find('.changeProfileUrl').simulate('click')
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/settings')
    wrapper.find('.restoreProfileUrl').simulate('click')
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/profile')
    wrapper.find('.changeProfileUrl').simulate('click')
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/settings')
    wrapper.find('.restoreProfileUrl').simulate('click')
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/profile')
    wrapper.unmount()
  });

  it("can remove item", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp/>)
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/profile')
    wrapper.find('.removeProfile').simulate('click')
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(2)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    wrapper.unmount()
  });

  it("can render separator", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp separator={<a>/</a>} />)
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(5)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props().children).to.equal('/')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user')
    expect(wrapper.find('a').at(3).props().children).to.equal('/')
    expect(wrapper.find('a').at(4).props().to).to.equal('/user/profile')
    wrapper.unmount()
  });

  it("can render one item", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp onlyOneItem />);
    runAllTimers();
    expect(wrapper.find('a')).to.have.length(1);
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    wrapper.unmount()
  });

  it("can render no any item", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp noAnyItem />);
    runAllTimers();
    expect(wrapper.find('a')).to.have.length(0);
    wrapper.unmount()
  });

  it("can rename props", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp renameProps={{to:"href"}} />);
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props()).to.not.have.property("to")
    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    expect(wrapper.find('a').at(1).props()).to.not.have.property("to")
    expect(wrapper.find('a').at(1).props().href).to.equal('/user')
    expect(wrapper.find('a').at(2).props()).to.not.have.property("to")
    expect(wrapper.find('a').at(2).props().href).to.equal('/user/profile')
    wrapper.unmount()
  });

  it("can duplicate props", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp duplicateProps={{to:"href"}} />);
    runAllTimers();
    expect(wrapper.find('a')).to.have.length(3);
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(1).props().href).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/profile')
    expect(wrapper.find('a').at(2).props().href).to.equal('/user/profile')
    wrapper.unmount()
  });

  it("have dummy components", function() {
    expect(Dummy()).to.be.null;
    expect(Item()).to.be.null;
  })
});


} // spec()