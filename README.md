# react-breadcrumbs-dynamic

[![Npm package](https://img.shields.io/npm/v/react-breadcrumbs-dynamic.svg?style=flat)](https://npmjs.com/package/react-breadcrumbs-dynamic)
[![Npm downloads](https://img.shields.io/npm/dm/react-breadcrumbs-dynamic.svg?style=flat)](https://npmjs.com/package/react-breadcrumbs-dynamic)
[![Travis build status](http://img.shields.io/travis/oklas/react-breadcrumbs-dynamic.svg?style=flat)](https://travis-ci.org/oklas/react-breadcrumbs-dynamic)
[![Test Coverage](https://img.shields.io/codecov/c/github/oklas/react-breadcrumbs-dynamic.svg)](https://codecov.io/gh/oklas/react-breadcrumbs-dynamic)
[![Code Climate](https://codeclimate.com/github/oklas/react-breadcrumbs-dynamic/badges/gpa.svg)](https://codeclimate.com/github/oklas/react-breadcrumbs-dynamic)
[![Dependency Status](https://david-dm.org/oklas/react-breadcrumbs-dynamic.svg)](https://david-dm.org/oklas/react-breadcrumbs-dynamic)

***

[`🏠`](https://oklas.github.io/react-breadcrumbs-dynamic) > [`React dynamic breadcrumbs`](https://oklas.github.io/react-breadcrumbs-dynamic) > [`extremely flexible`](https://oklas.github.io/react-breadcrumbs-dynamic) > [`and`](https://oklas.github.io/react-breadcrumbs-dynamic) > [`easy to use`](https://oklas.github.io/react-breadcrumbs-dynamic)


This is completely router-independent react breadcrumbs solution which means
that you can use it with any version of React Router (2 or 3 or 4) or any other
routing library for React or without routing at all. All what you need is just
to specify components for breadcrumbs items and its props. However props and
components should be specified separately. Props should be specified in
intermediator component `BreadcrumbsItem` anywhere in your hierarchy of
components and routes. Breadcrumbs will be built and (currently) sorted by the
length of the URL. An application may contain several breadcrumbs with different
components and design.

Visit live **[DEMO](//oklas.github.io/react-breadcrumbs-dynamic)** (source code of demo in [example](example) folder)


# Installation

``` sh
npm install --save react-breadcrumbs-dynamic

# definitions may be installed if typescript is used
# ( worked for 1.0.10, leave feedback if any )
npm install --save @types/react-breadcrumbs-dynamic
```

# Base configuration

Add a `<ThroughProvider/>` component to the root of your React component
tree like you do it for `react-redux` or `react-router` if you does not use
that yet. Read more about `ThroughProvider` in
[react-through](https://github.com/oklas/react-through) manual.
The `through area` name used by this library is `breadcrumbs`

``` javascript
import {ThroughProvider} from 'react-through'

const theApp = (
  <ThroughProvider>
    <App />
  </ThroughProvider>
)

ReactDOM.render(theApp, document.getElementById('root'))
```


# Instance configuration

The breadcrumbs instance is implemented in the `Breadcrumbs` component, which is
the `through container` in terms of
[react-through](https://github.com/oklas/react-through). 
The `Breadcrumbs` component needs to be configured, however all params have
default value. In this example the `react-router` v4 routing specification is
used. Please note that `item` and `finalItem` require react component (class)
instead of react element. However `separator` requires react element.

``` javascript
import {Breadcrumbs} from 'react-breadcrumbs-dynamic'

const Page = (props) => (
  return (
    <div className="App">
      <Header>
        <Breadcrumbs
          separator={<b> / </b>}
          item={NavLink}
          finalItem={'b'}
          finalProps={{
            style: {color: 'red'}
          }}
        />
      </Header>
      {props.children}
      <Footer>
        <Breadcrumbs/>
      </Footer>
    </div>
  )
}
```


# Add item to breadcrumbs

Each routed component in your react tree is generally associated with route
and with correspondent breadcrumbs. Each component may add its breadcrumbs
item by instantiate `BreadcrumbsItem` component. The `BreadcrumbsItem`
component which is the `through agent` with bearing key in prop `to` in
terms of [react-through](https://github.com/oklas/react-through). 

The `BreadcrumbsItem` component mandatory requires the `to` prop which
contains bearing key with URL for breadcrumbs working. So if you use simple
`<a>` tag for breadcrumb url - you need to use the `duplicateProps` and/or
`renameProps`, or need to specify both `to` and `href`.
Read also *Advanced Usage and Performance* section in
[react-through](https://github.com/oklas/react-through) manual.

Simple configure of the breadcrumbs items:

``` javascript

import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic'

const App = (props) => (
  <div>
    <BreadcrumbsItem to='/'>Main Page</BreadcrumbsItem>
    {props.children}
    <Route exact path="/user" component={User} />
  </div>
)
  
const User = (props) => (
  <div>
    <BreadcrumbsItem to='/user'>Home</BreadcrumbsItem>
    <h2>Home</h2>
    {props.children}
    <Route exact path="/user/contacts" component={Contacts} />
  </div>
)

const Contacts = (props) => (
  <div>
    <BreadcrumbsItem to='/user/contacts'>Contacts</BreadcrumbsItem>
    <h2>Contacts</h2>
    ...
  </div>
)
```


# Result

The result of above code will represent breadcrumbs like this:

``` javascript
  <NavLink to='/'>Main Page</NavLink>
  <b> / </b>
  <NavLink to='/user'>Home</NavLink>
  <b> / </b>
  <b to='/user/contacts'>Contacts</b>
```

If you use library or if you think that it is good for use -
let people know about that - click the star.

___


# The components and functions

## `Breadcrumbs` component props

* `separator` - separator between breadcrumbs items (default: undefined)
* `item` - component of breadcrumbs items (default: 'a')
* `finalItem` - component of final breadcrumbs item (default: value of `item` prop)
* `finalProps` - final item props which override specified in `BreadcrumbsItem` (default: {})
* `container` - wrapper component (default is `span`)
* `containerProps` - props for `container` components if defined (default: {})
* `renameProps` - rename props passed from item intermedator to item
* `duplicateProps` - duplicate same as `renameProps` but without remove original.


## `BreadcrumbsItem` component props

The `BreadcrumbsItem` component may have any prop and may have children. Each prop
for `BreadcrumbsItem` will be passed to correspondent breadcrumb component specified
in `item` or `finalItem` prop of `Breadcrumbs`. Only one prop is mandatory.

* `to` - mandatory required bearing key with URL for breadcrumbs working
* `...` - any more number of properties.


## `withBreadcrumbsItem()` function

This function creates higher order component. It acquire one argument with your
custom react component and return appropriate component which will have
`breadcrumbs` in its props with methods `item()` and `items()`
like `throughAgent` from [react-through](https://github.com/oklas/react-through).


### `this.props.breadcrumbs.item()` and `this.props.breadcrumbs.items()`

Methods to configure breadcrumbs item of your current react component.
These methods will be added to props by HOC of `withBreadcrumbsItem` function.
The function `item()` accepts one react component with props and the functions
`items()` accepts react component with children which may contain any number of
components to create correspondent number of breadcrumbs item. The breadcrumbs
item for these functions may be any react component and only props is
significant. The `Dummy` and the `Item` components is exported by library
for this case. Each function accepts null to reset breadcrumbs items to none if
current component is no more needed to represent any breadcrumbs items.


## LICENSE

#### [MIT](./LICENSE.md)
