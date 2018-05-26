import React from 'react'
import PropTypes from 'prop-types'
import enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'

import {
  BreadcrumbsProvider,
  Breadcrumbs,
  BreadcrumbsItem,
} from '../index'


enzyme.configure({ adapter: new Adapter() });
jest.dontMock('../index')


class TestApp extends React.Component {
  static propTypes = {
    compare: PropTypes.func,
  }

  render() {
    return (
      <BreadcrumbsProvider>
        <div>

          <Breadcrumbs compare={this.props.compare} removeProps={{ weight: true }} />

          <BreadcrumbsItem to='/' weight={50} />

          <BreadcrumbsItem to='/first' weight={200} />

          <BreadcrumbsItem to='/first/second' weight={100} />

          <BreadcrumbsItem to='https://oklas.github.io/react-breadcrumbs-dynamic/' weight={0} />

        </div>
      </BreadcrumbsProvider>
    )
  }
}


describe('breadcrumbs with custom compare function', function() {
  it("custom order", function() {
    const wrapper = mount(<TestApp compare={(a, b)=> a.weight - b.weight} />)
    expect(wrapper.find('a').at(1).props().href).to.equal('/')
    expect(wrapper.find('a').at(3).props().href).to.equal('/first')
    expect(wrapper.find('a').at(2).props().href).to.equal('/first/second')
    expect(wrapper.find('a').at(0).props().href).to.equal('https://oklas.github.io/react-breadcrumbs-dynamic/')

    wrapper.unmount()
  })

  it("default order", function() {
    const wrapper = mount(<TestApp />)

    expect(wrapper.find('a').at(0).props().href).to.equal('/')
    expect(wrapper.find('a').at(1).props().href).to.equal('/first')
    expect(wrapper.find('a').at(2).props().href).to.equal('/first/second')
    expect(wrapper.find('a').at(3).props().href).to.equal('https://oklas.github.io/react-breadcrumbs-dynamic/')

    wrapper.unmount()
  })
})
