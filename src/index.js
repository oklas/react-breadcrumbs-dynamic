import React, { Children } from 'react'
import PropTypes from 'prop-types'

import {
  ThroughProvider,
  throughContainer,
  throughAgent,
  throughAgentFactory,
  throughInterface,
} from 'react-through'


export const breadcrumbsThroughArea = 'breadcrumbs'

export const breadcrumbsBearingKey = 'to'

export const withBreadcrumbs = throughInterface(breadcrumbsThroughArea)

export const withBreadcrumbsItem = throughAgent(breadcrumbsThroughArea, breadcrumbsBearingKey)

export const withBreadcrumbsContainer = throughContainer(breadcrumbsThroughArea)

export const Dummy = () => null

export const Item = () => null

export const BreadcrumbsProvider = ThroughProvider

export const BreadcrumbsItem = throughAgentFactory(breadcrumbsThroughArea, breadcrumbsBearingKey)


function propsRenAndDup(props, ren, dup) {
  const p = Object.assign({}, props)
  Object.keys(dup).forEach(k => {
    p[dup[k]] = p[k]
  })
  Object.keys(ren).forEach(k => {
    p[ren[k]] = p[k]; delete p[k]
  })
  return p
}


const Breadcrumbs_ = (props) => {
  const data = props[breadcrumbsThroughArea]
  const pathnames = Object.keys(data).sort(function(a, b) {
    return a.length - b.length
  })

  const Container = props.container || 'span'
  const containerProps = props.containerProps
  const Item = props.item || 'a'
  const FinalItem = props.finalItem || Item
  const finalProps = props.finalProps || {}
  const separator = props.separator
  const count = pathnames.length
  const ren = props.renameProps || (
    Item == 'a' ? {to: 'href'} : {}
  )
  const dup = props.duplicateProps || {}

  return (
    <Container {...containerProps}>

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

export const Breadcrumbs = withBreadcrumbsContainer(Breadcrumbs_)
