# react-breadcrumbs-dynamic

[![Npm package](https://img.shields.io/npm/v/react-breadcrumbs-dynamic.svg?style=flat)](https://npmjs.com/package/react-breadcrumbs-dynamic)
[![Npm downloads](https://img.shields.io/npm/dm/react-breadcrumbs-dynamic.svg?style=flat)](https://npmjs.com/package/react-breadcrumbs-dynamic)
[![Travis build status](http://img.shields.io/travis/oklas/react-breadcrumbs-dynamic.svg?style=flat)](https://travis-ci.org/oklas/react-breadcrumbs-dynamic)
[![Test Coverage](https://img.shields.io/codecov/c/github/oklas/react-breadcrumbs-dynamic.svg)](https://codecov.io/gh/oklas/react-breadcrumbs-dynamic)
[![Dependency Status](https://david-dm.org/oklas/react-breadcrumbs-dynamic.svg)](https://david-dm.org/oklas/react-breadcrumbs-dynamic)

***

[`🏠`](https://oklas.github.io/react-breadcrumbs-dynamic) > [`React dynamic breadcrumbs`](https://oklas.github.io/react-breadcrumbs-dynamic) > [`extremely flexible`](https://oklas.github.io/react-breadcrumbs-dynamic) > [`and`](https://oklas.github.io/react-breadcrumbs-dynamic) > [`easy to use`](https://oklas.github.io/react-breadcrumbs-dynamic)


This is completely router-independent solution. You can use it with any version
of React Router (2 or 3 or 4) or any other routing library for React or without
routing at all. All what you need is just to specify components for breadcrumbs
items and its props. However props and components should be specified
[separately](https://github.com/oklas/react-through#readme). Props should be specified
in intermediator component `BreadcrumbsItem` anywhere in your hierarchy of
components and routes.

Visit live **[DEMO](//oklas.github.io/react-breadcrumbs-dynamic)** (source code
of demo in [example](example/src) folder)

# Synopsis

```js
const Profile = ({user}) => (
  <div>

    <BreadcrumbsItem
      to=`/user/${user.login}`
      icon='account-box'
    >
      {user.firstName} {user.lastName}
    </BreadcrumbsItem>

    <h1>
      {user.firstName} {user.lastName}
    </h1>
  </div>
)
```

# Installation

``` sh
npm install --save react-through react-breadcrumbs-dynamic

# definitions may be installed if typescript is used
# ( worked for 1.0.10, leave feedback if any )
npm install --save @types/react-breadcrumbs-dynamic
```

# Base configuration

Do you already use declarative communications through react tree with
[react-through](https://github.com/oklas/react-through#readme)?
Just add `<ThroughProvider/>` to the root of your React component tree:

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

In this example the `react-router` v4 `<NavLink>` is used as breadcrumbs item:

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

Please note that `item` and `finalItem` require react component (class) instead
of react element. However `separator` requires react element.

By default order of items is based on URL length. You can override the sort order
as you like just specify comparision function in `compare` prop which receive
pair of objects containing props of breadcrumbs item. For example:
`<Breadcrumbs compare={(a,b)=>a.weight-b.weight} removeProps={{weight: true}} />`.

If you use `<a>` tag based items then you will find `renameProps` or
`duplicateProps` useful to map prop `to` on prop `href` like this:
`<Breadcrumbs renameProps={{to:"href"}} />`.


# Adding items to breadcrumbs

Each routed component in your react tree is generally associated with route
and with correspondent breadcrumbs. Each component may add its breadcrumbs
item by rendering `<BreadcrumbsItem>` with any props and children.

Example tree of routed components with breadcrumbs items:

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

You can declaratively pass props with any data, functions, components and so on
through react tree in any direction because
[react-through](https://github.com/oklas/react-through#readme) allows to do that.


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

The breadcrumbs instance is implemented in the `Breadcrumbs` component, which
is the `through container` in terms of
[react-through](https://github.com/oklas/react-through#readme).

| property | type | default | description |
| -------- | ---- | ------- | ------- |
| `separator` | *element* | `undefined` | separator between breadcrumbs items |
| `item` | *component* | `a` | component of breadcrumbs items |
| `finalItem` | *component* | value of `item` prop | component of final breadcrumbs item |
| `finalProps` | *object* | `{}` | final item props - will override specified in `BreadcrumbsItem` |
| `container` | *component* | `span` | wrapper component |
| `containerProps` | *object* | `{}` | props for `container` component |
| `compare` | *function* | (a,b)=>a.to.length-b.to.length | comparision function for sorting items |
| `hideIfEmpty` | *boolean* | `false` | show or hide breadcrumbs container if items exist or not |
| `renameProps` | *object* | `{}` | rename props passed from item `BreadcrumbsItem` to `item` |
| `duplicateProps` | *object* | `{}` | duplicate props passed from item `BreadcrumbsItem` to `item` |
| `removeProps` | *object* | `{}` | props aren't passed from item `BreadcrumbsItem` to `item` |


## `BreadcrumbsItem` component props

The `BreadcrumbsItem` component is the `through agent` with bearing key in
prop `to` in terms of [react-through](https://github.com/oklas/react-through#readme).

The `BreadcrumbsItem` component may have any prop and may have children. Each prop
for `BreadcrumbsItem` will be passed to correspondent breadcrumb component specified
in `item` or `finalItem` prop of `Breadcrumbs`. Only one prop is mandatory.

| property | type | default | description |
| -------- | ---- | ------- | ------- |
| `to` | *string* | required | mandatory required bearing key with URL |
| `...` | *any* | | any properties - will be mapped to correspondent breadcrumb item |

___


### `withBreadcrumbsItem()` function

Advanced usage higher order component function. It acquire one argument with
your custom react component and return appropriate component which will have
`breadcrumbs` in its props with methods `item()` and `items()` like
`throughAgent` from [react-through](https://github.com/oklas/react-through#readme).


### `this.props.breadcrumbs.item()` and `this.props.breadcrumbs.items()`

Advanced usage methods to configure breadcrumbs item of your react component.
These methods will be added to props by HOC of `withBreadcrumbsItem` function.
The function `item()` accepts one react component with props and the functions
`items()` accepts react component with children which may contain any number of
components to create correspondent number of breadcrumbs item. The breadcrumbs
item for these functions may be any react component and only props is
significant. The `Dummy` and the `Item` components is exported by library
for this case. Each function accepts null to reset breadcrumbs items to none if
current component is no more needed to represent any breadcrumbs items.


### constants

The `through area` name  used by this library is defined in
`breadcrumbsThroughArea` variable.

The prop name which contain bearing key is defined in
`breadcrumbsBearingKey`.


``` javascript
import { breadcrumbsThroughArea } from 'react-breadcrumbs-dynamic'
import { breadcrumbsBearingKey } from 'react-breadcrumbs-dynamic'
```


## LICENSE

#### [MIT](./LICENSE.md)
