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

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


enzyme.configure({ adapter: new Adapter() });
jest.dontMock('../index')


const createComponent = (children) => {
  const SameComponent = () => (
    <div>
      <BreadcrumbsItem to='/same'><i>{children}</i></BreadcrumbsItem>
    </div>
  )
  return SameComponent
}


class TestApp extends React.Component {
  render() {
    return (
      <Router>
        <BreadcrumbsProvider>
          <div>

            <Breadcrumbs/>

            <Route
              render={({history}) => (
                <div>
                  <button
                    type='button'
                    className="navigateToIndex"
                    onClick={() => { history.push('/same') }}
                    children='index'
                  />

                  <button
                    type='button'
                    className="navigateToSame"
                    onClick={() => { history.push('/same/1') }}
                    children='same'
                  />
                </div>
              )}
            />

            <Route exact path="/same" component={createComponent('index')} />
            <Route path="/same/:id" component={createComponent('same')} />

          </div>
        </BreadcrumbsProvider>
      </Router>
    )
  }
}


describe('breadcrumbs with react-router', function() {
  it("replace another element with same props", function() {
    const wrapper = mount(<TestApp/>)

    wrapper.find('.navigateToIndex').simulate('click')
    expect(wrapper.find('a').at(0).props().href).to.equal('/same')
    expect(wrapper.find('i').at(0).props().children).to.equal('index')

    wrapper.find('.navigateToSame').simulate('click')
    expect(wrapper.find('a').at(0).props().href).to.equal('/same')
    expect(wrapper.find('i').at(0).props().children).to.equal('same')

    wrapper.unmount()
  })
})