import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { Broadcast, Subscriber } from 'react-broadcast'


function withBreadcrumbs(BreadcrumbsComponent) {
  const Breadcrumbs = (props, context) => {
    return (
      <Subscriber channel="breadcrumbs">
        { breadcrumbs =>
          <BreadcrumbsComponent {...props} breadcrumbs={breadcrumbs} />
        }
      </Subscriber>
    )
  }
  return Breadcrumbs
}


export class BreadcrumbsProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  install = (to, props) => {
    this.setState({[to]: {...props}})
  }

  remove = to => {
    this.setState({[to]: undefined})
  }

  render() {
    return (
      <Broadcast channel="breadcrumbs" value={{
        data: this.state,
        install: this.install,
        remove: this.remove,
      }}>
        {this.props.children}
      </Broadcast>
    )
  }
}


class BreadcrumbsItem_ extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    const {breadcrumbs: {install, remove}} = props
    this.install = install
    this.remove = remove
  }

  componentWillMount() {
    const {breadcrumbs, ...props} = this.props
    this.install(props.to, props)
  }

  componentWillReceiveProps({breadcrumbs, ...nextProps}) {
    const {...props} = this.props
    delete props.breadcrumbs
    const keys = Object.keys(nextProps).concat(Object.keys(props))
    const differences = keys.filter(
      k => (props[k] !== nextProps[k])
    ).length
    if( differences ) {
      this.install(props.to, props)
    }
  }

  componentWillUnmount() {
    this.remove(this.props.to)
  }

  render() {
    return null
  }
}

export const BreadcrumbsItem = withBreadcrumbs(BreadcrumbsItem_)


function Breadcrumbs_(props) {
  const {data} = props.breadcrumbs
  const pathnames = Object.keys(data).sort(function(a, b) {
    return a.length - b.length;
  });
  return (
    <span>
      {pathnames.map((pathname,i) =>
        <span>
          {i ? ' / ' : null}
          <a href={pathname}>{data[pathname].title}</a>
        </span>
      )}
    </span>
  )
}

export const Breadcrumbs = withBreadcrumbs(Breadcrumbs_)
