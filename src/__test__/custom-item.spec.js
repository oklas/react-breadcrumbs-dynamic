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


const CustomItem = props => (
  <b>{props.to}</b>
)


class TestApp extends React.Component {
  render() {
    return (
      <BreadcrumbsProvider>
        <div>

          <Breadcrumbs item={CustomItem} />

          <BreadcrumbsItem to='/' />

          <BreadcrumbsItem to='/home' />

        </div>
      </BreadcrumbsProvider>
    )
  }
}


describe('breadcrumbs with custom item', function() {
  it("our defined breadcrumbs items", function() {
    const wrapper = mount(<TestApp/>)

    expect(wrapper.find('b').at(0).props().children).to.equal('/')

    expect(wrapper.find('b').at(1).props().children).to.equal('/home')

    wrapper.unmount()
  })
})