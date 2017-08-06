# react-breadcrumbs-dynamic

[![Npm package](https://img.shields.io/npm/v/react-breadcrumbs-dynamic.svg?style=flat)](https://npmjs.com/package/react-breadcrumbs-dynamic)
[![Travis build status](http://img.shields.io/travis/oklas/react-breadcrumbs-dynamic.svg?style=flat)](https://travis-ci.org/oklas/react-breadcrumbs-dynamic)
[![Code Climate](https://codeclimate.com/github/oklas/react-breadcrumbs-dynamic/badges/gpa.svg)](https://codeclimate.com/github/oklas/react-breadcrumbs-dynamic)
[![Test Coverage](https://img.shields.io/codecov/c/github/oklas/react-breadcrumbs-dynamic.svg)](https://codecov.io/gh/oklas/react-breadcrumbs-dynamic)
[![Dependency Status](https://david-dm.org/oklas/react-breadcrumbs-dynamic.svg)](https://david-dm.org/oklas/react-breadcrumbs-dynamic)
[![devDependency Status](https://david-dm.org/oklas/react-breadcrumbs-dynamic/dev-status.svg)](https://david-dm.org/oklas/react-breadcrumbs-dynamic#info=devDependencies)

***

[`🏠`](https://oklas.github.io/react-breadcrumbs-dynamic) > [`React dynamic breadcrumbs`](https://oklas.github.io/react-breadcrumbs-dynamic) > [`extremely flexible`](https://oklas.github.io/react-breadcrumbs-dynamic) > [`and`](https://oklas.github.io/react-breadcrumbs-dynamic) > [`easy to use`](https://oklas.github.io/react-breadcrumbs-dynamic)


This may be used with any version of `react-router` (2 or 3 or 4) or any
else or without it. What you need is just to specify components for
breadcrumbs items and its props. However props and components need to be
specified separately. Props need to specify in intermediator component
`BreadcrumbsItem` anywhere in your hierarchy of components and routes.
Breadcrumbs will be built and (currently) sorted by the length of the
URL. An application may contain several breadcrumbs with different
components and design.

Visit live **[DEMO](//oklas.github.io/react-breadcrumbs-dynamic)** (source code of demo in [example](example) folder)


# Installation

``` sh
npm install --save react-breadcrumbs-dynamic
```

# Base configuration

Add a `<BreadcrumbsProvider/>` component to the root of your React component
tree like you do it for `react-redux` or `react-router`.
The `BreadcrumbsProvider` component must be parent in react tree of all
components of this library with any deeps of nesting.

``` javascript
import {BreadcrumbsProvider} from 'react-breadcrumbs-dynamic'

const theApp = (
  <BreadcrumbsProvider>
    <App />
  </BreadcrumbsProvider>
)

ReactDOM.render(theApp, document.getElementById('root'))
```

# Instance configuration

The breadcrumbs instance is implemented in the `Breadcrumbs` component. The
`Breadcrumbs` component need to be configured, however all params have default
value. In this example the `react-router` v4 routing specification is used.
Please note that `item` and `finalItem` require react component (class) instead
of react element. However `separator` require react element.

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

Each routed component in your react tree generally associated with route
and with correspondent breadcrumbs. Each component may add its breadcrumbs
item. The `BreadcrumbsItem` component mandatory require the `to` prop which
contain bearing key with URL for breadcrumbs working. So if you use simple
`<a>` tag for breadcrumb url - you need to use the `duplicateProps` and/or
`renameProps`, or need to specify both `to` and `href`.


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


# The component props

## `Breadcrumbs` component props

* `separator` - separator between breadcrumbs items (default: undefined)
* `item` - component of breadcrumbs items (default: 'a')
* `finalItem` - component of final breadcrumbs item (default: value of `item` prop)
* `finalProps` - final item props which override specified in `BreadcrumbsItem` (default: {})
* `container` - wrapper component (default is `span`)
* `containerProps` - props for `container` components if defined (default: {})
* `renameProps` - rename props passed from item intermedator to item
* `duplicateProps` - duplicate same as `renameProps` but without remove original


## `BreadcrumbsItem` component props

The `BreadcrumbsItem` component may have any prop and may have children. Each prop
for `BreadcrumbsItem` will be passed to correspondent breadcrumb component specified
in `item` or `finalItem` prop of `Breadcrumbs`. Only one prop is mandatory.

* `to` - mandatory required bearing key with URL for breadcrumbs working
* `...` - any more number of properties


## `BreadcrumbsProvider` component props

The `BreadcrumbsProvider` have not props.


## LICENSE

#### [MIT](./LICENSE.md)
