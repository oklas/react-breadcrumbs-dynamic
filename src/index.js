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
      data: {}
    }
  }

  install = (to, props) => {
    const {data} = this.state
    data[to] = {...props}
    this.setState({data})
  }

  remove = to => {
    const {data} = this.state
    delete data[to]
    this.setState({data})
  }

  render() {
    return (
      <Broadcast channel="breadcrumbs" value={{
        data: this.state.data,
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

function propsRenAndDup(props, ren, dup) {
  const p = Object.assign({}, props)
  Object.keys(dup).forEach(k => {
    p[dup[k]] = p[k]
  })
  Object.keys(ren).forEach(k => {
    p[dup[k]] = p[k]; delete p[k]
  })
  return p
}


function Breadcrumbs_(props) {
  const {data} = props.breadcrumbs
  const pathnames = Object.keys(data).sort(function(a, b) {
    return a.length - b.length;
  });

  const Container = props.container || 'span'
  const containerParams = props.containerParams
  const Item = props.item || 'a'
  const FinalItem = props.finalItem || Item
  const finalProps = props.finalProps || {}
  const separator = props.separator
  const count = pathnames.length
  const ren = props.renameProps || {}
  const dup = props.duplicateProps || {}

  return (
    <Container {...containerParams}>

      {pathnames.map((pathname,i) => {
        return i+1 < count ? (

          separator ? (
            <span key={i}>
              <Item {...propsRenAndDup(data[pathname], ren, dup)} />
              {separator}
            </span>
          ) : (
            <Item key={i} {...propsRenAndDup(data[pathname], ren, dup)} />
          )

        ) : (

          <FinalItem key={i}
            {...propsRenAndDup(data[pathname], ren, dup)}
            {...finalProps}
          />

        )
      })}

    </Container>
  )
}

export const Breadcrumbs = withBreadcrumbs(Breadcrumbs_)
