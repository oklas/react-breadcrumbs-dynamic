import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'
import { Dummy, Item, BreadcrumbsProvider, withBreadcrumbsItem } from '../index'

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
    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    expect(wrapper.find('a').at(1).props().href).to.equal('/user')
    expect(wrapper.find('a').at(2).props().href).to.equal('/user/profile')
    wrapper.find('.changeProfileUrl').simulate('click')
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    expect(wrapper.find('a').at(1).props().href).to.equal('/user')
    expect(wrapper.find('a').at(2).props().href).to.equal('/user/settings')
    wrapper.find('.restoreProfileUrl').simulate('click')
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    expect(wrapper.find('a').at(1).props().href).to.equal('/user')
    expect(wrapper.find('a').at(2).props().href).to.equal('/user/profile')
    wrapper.unmount()
  })

  it("can remove item", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp/>)
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    expect(wrapper.find('a').at(1).props().href).to.equal('/user')
    expect(wrapper.find('a').at(2).props().href).to.equal('/user/profile')
    wrapper.find('.removeProfile').simulate('click')
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(2)
    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    expect(wrapper.find('a').at(1).props().href).to.equal('/user')
    wrapper.unmount()
  })

  it("can render separator", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp separator={<a>/</a>} />)
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(5)
    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    expect(wrapper.find('a').at(1).props().children).to.equal('/')
    expect(wrapper.find('a').at(2).props().href).to.equal('/user')
    expect(wrapper.find('a').at(3).props().children).to.equal('/')
    expect(wrapper.find('a').at(4).props().href).to.equal('/user/profile')
    wrapper.unmount()
  })

  it("can specify container props", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp
      container={"article"}
      containerProps={{data:"containerProps"}}
    />)
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('article')).to.have.length(1)
    expect(wrapper.find('article').at(0).props().data).to.equal('containerProps')
  })

  it("can render one item", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp onlyOneItem />)
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(1)
    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    wrapper.unmount()
  })

  it("can render no any item", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp noAnyItem />)
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(0)
    wrapper.unmount()
  })

  it("pass react component in props", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp reactComponentInProps/>)
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('b')).to.have.length(1)
    expect(wrapper.find('b').props().children).to.equal('Home Bold')
    wrapper.unmount()
  });

  it("replace another element with same props", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp/>)
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    expect(wrapper.find('a').at(0).props().children).to.equal('Home')
    wrapper.find('.replaceAnotherSame').simulate('click')
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    expect(wrapper.find('a').at(0).props().children).to.equal('Home Another')
    wrapper.unmount()
  });

  it("can rename props", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp renameProps={{}} />)
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props()).to.not.have.property("href")
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(1).props()).to.not.have.property("href")
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(2).props()).to.not.have.property("href")
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/profile')
    wrapper.unmount()
  })

  it("can duplicate props", function() {
    useFakeTimers()
    const wrapper = mount(<TestApp renameProps={{}} duplicateProps={{to:"href"}} />)
    runAllTimers()
    expect(wrapper.find('a')).to.have.length(3)
    expect(wrapper.find('a').at(0).props().to).to.equal('/')
    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    expect(wrapper.find('a').at(1).props().to).to.equal('/user')
    expect(wrapper.find('a').at(1).props().href).to.equal('/user')
    expect(wrapper.find('a').at(2).props().to).to.equal('/user/profile')
    expect(wrapper.find('a').at(2).props().href).to.equal('/user/profile')
    wrapper.unmount()
  })

  it("hides items in case of hideIfEmpty equal true", function() {
    useFakeTimers()
    const wrapper = mount(
        <TestApp
            hideIfEmpty
            noAnyItem
            containerProps={{ className: 'crumbs-wrapper' }}
        />
    )
    runAllTimers()
    expect(wrapper.find('.crumbs-wrapper')).to.have.length(0)
    wrapper.unmount()
  })

  it("have dummy components", function() {
    expect(Dummy()).to.be.null
    expect(Item()).to.be.null
  })
})


} // spec()
