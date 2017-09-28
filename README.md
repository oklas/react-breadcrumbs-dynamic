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
you can use it with any version of React Router (2 or 3 or 4) or any other
routing library for React or without routing at all. What you need is just
to specify components for breadcrumbs items and its props. However props and
components need to be specified separately. Props need to specify in
intermediator component `BreadcrumbsItem` anywhere in your hierarchy of
components and routes. Breadcrumbs will be built and (currently) sorted by the
length of the URL. An application may contain several breadcrumbs with different
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

This items configuration method is simple and enough effective. More details
about performance is described in section Advanced Usage and Performance.

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


# Advanced Usage and Performance

This library does everything possible to make the thing simple and enough
effective. However, the library cannot know about your application state nor
can undertake deep inspections of your data to detect changes in efficiency
considerations. This section describes more effective but more complicated
way which allows achieve maximum efficiency.


## Avoid to pass arrays/objects/jsx in props of `BreadcrumbsItem`

Each time when jsx code like this: `<tag>...</tag>` or `<Component t='...'/>`
is executed the new react element instance is created, even if you pass same
props. Also objects or arrays frequently created inplace and represent itself
new instance which considered as value change event even if it has same values
in depth.

The Library does not analyze data into depth to detect changes. So when you
pass new react element or newly created array or object to `BreadcrumbsItem`
as props it receives same props with new value. It gives proper result but
applying params will be defered to additional tree rerendering step and
executed after all again.

Full complete list of types allowed as `BreadcrumbsItem` props for better
performance:

* string
* number
* undefined
* boolean
* symbol

So to avoid additional processing does not specify arrays or objects or react
elements (ie jsx) as props of `BreadcrumbsItem` in `render()` method:

``` javascript
render() {
  return <BreadcrumbsItem to='/' title={<b>Main Page</b>} x={[1,2,3]}/> // bad
}

render() {
  return <BreadcrumbsItem to='/'><b>Main Page</b></BreadcrumbsItem> // bad
}

render() {
  return <BreadcrumbsItem to='/'>Main Page</BreadcrumbsItem> // good
}
```


## Best performance

Best performance can be achieved when breadcrumbs items is applied only at time
of change application data related to breadcrubms. The library provides
interface for that. The higher order component creation function
`withBreadcrumbsItem` integrate `breadcrumbs` object with `item()` and `items()`
functions into props of your `Component`.

**Warning**: Never call `breadcrumbs.item()` or `breadcrumbs.items()` from
`render()` or `componentWillUpdate()` methods of your component, nor from
`constructor()`. This mean breadcrumbs item must be not depend from state of
your current "with breadcrubms" component.

This way allows to specify arrays and objects and react elements (i.e. jsx) in
props but functions `breadcrumbs.item()` or `breadcrumbs.items()` must be
called from the `if` statement, where the condition performs checking for
changes the application data which related to breadcrubms.


``` javascript
import { withBreadcrumbsItem, Dummy as Item } from 'react-breadcrumbs-dynamic'

@withBreadcrumbsItem
class CustomComponent extends React.Component {
  static propTypes = {
    breadcrumbs: PropTypes.object,
  }

  componentWillMount() {
    this.configureBreadcrumbs(this.props)
  }

  componentWillReceiveProps(nextProps) {
    // mandatory required change checking condition
    if( this.props.slug !== nextProps.slug ) {
      this.configureBreadcrumbs(nextProps)
    }
  }

  configureBreadcrumbs = (props) => {
    props.breadcrumbs.items(
      <div>
        <Item to='/' some={[1,2,3]}><b>Home</b></Item>
        <Item to=`/${props.slug}`><b>{props.slug}</b></Item>
      </div>
    )
  }

  render() {
    return (
      <div />
    )
  }
}
```

# The components and functions

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


## `withBreadcrumbsItem()` function

This function creates higher order component. It acquire one argument with your
custom react component and return appropriate component which will have
`breadcrumbs` in its props with methods `item()` and `items()`


## `this.props.breadcrumbs.item()` and `this.props.breadcrumbs.items()`

Methods to configure breadcrumbs item of your current react component.
These methods will be added to props by HOC of `withBreadcrumbsItem` function.
The function `item()` accept one react component with props and the functions
`items()` accepts react component with children which may contain any number of
components to create correspondent number of breadcrumbs item. The breadcrumbs
item for this functions may be any react component and only props is
significant. The `Dummy` and the `Item` components is exported by library
for this case. Each function accepts null to reset breadcrumbs items to none if
current component no more needed to represent any breadcrumbs items.


## LICENSE

#### [MIT](./LICENSE.md)
