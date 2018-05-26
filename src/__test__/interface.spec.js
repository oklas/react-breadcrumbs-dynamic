import React from 'react'
import PropTypes from 'prop-types'
import enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'

import {
  BreadcrumbsProvider,
  Breadcrumbs,
  withBreadcrumbs,
  breadcrumbsThroughArea as throughArea,
} from '../index'


enzyme.configure({ adapter: new Adapter() });
jest.dontMock('../index')


@withBreadcrumbs
class TestItem extends React.Component {
  static propTypes = {
    [throughArea]: PropTypes.object,
  }

  wrongInstallToKey = () => {
    this.props[throughArea].add([])
    this.props[throughArea].update([], {})
  }

  wrongInstallPropsType = () => {
    this.props[throughArea].add(new String('/'))
    this.props[throughArea].update(new String('/'), [])
  }

  goodInstallToKey = () => {
    this.props[throughArea].add("key")
    this.props[throughArea].update("key", {})
  }

  goodInstallToStringKey = () => {
    this.props[throughArea].add(new String('/'))
    this.props[throughArea].update(new String('/'), {})
  }

  render() {
    return (
      <div>
        <button className="wrongInstallToKey" onClick={this["wrongInstallToKey"]} />
        <button className="wrongInstallPropsType" onClick={this["wrongInstallPropsType"]} />
        <button className="goodInstallToKey" onClick={this["goodInstallToKey"]} />
        <button className="goodInstallToStringKey" onClick={this["goodInstallToStringKey"]} />
      </div>
    )
  }
}


const TestApp = () => (
  <BreadcrumbsProvider>
    <TestItem to='/'/>
  </BreadcrumbsProvider>
)

console.error(`
Please notice that errors in the console can currently mean
that error testing is running. This may not mean that there
are actually errors take place.
`)

describe('breadcrumbs api interface', function() {
  it("throw in install for wrong types", function() {
    const wrapper = mount(<TestApp/>)
    expect(wrapper.find('.wrongInstallToKey')).to.have.length(1)
    expect(wrapper.find('.wrongInstallPropsType')).to.have.length(1)
    expect(() => {
      wrapper.find('.wrongInstallToKey').simulate('click')
    }).to.throw()
    expect(() => {
      wrapper.find('.wrongInstallPropsType').simulate('click')
    }).to.throw()
    wrapper.unmount()
  })

  it("not throw in install for good types", function() {
    const wrapper = mount(<TestApp/>)
    expect(() => {
      wrapper.find('.goodInstallToKey').simulate('click')
    }).not.to.throw()
    expect(() => {
      wrapper.find('.goodInstallToStringKey').simulate('click')
    }).not.to.throw()
    wrapper.unmount()
  })
})

