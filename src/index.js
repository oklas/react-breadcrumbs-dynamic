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


function prepareProps(props, rename, duplicate, remove) {
  const p = Object.assign({}, props)
  Object.keys(duplicate).forEach(k => {
    p[duplicate[k]] = p[k]
  })
  Object.keys(rename).forEach(k => {
    p[rename[k]] = p[k]; delete p[k]
  })
  Object.keys(remove).forEach(k => {
    delete p[k]
  })
  return p
}


const Breadcrumbs_ = (props) => {
  const defaultCompare = (a, b) => a[0].length - b[0].length;
  const data = props[breadcrumbsThroughArea]
  const itemEntries = Object.entries(data).sort(props.compare || defaultCompare)
  const Container = props.container || 'span'
  const containerProps = props.containerProps
  const Item = props.item || 'a'
  const FinalItem = props.finalItem || Item
  const finalProps = props.finalProps || {}
  const separator = props.separator
  const count = itemEntries.length
  const rename = props.renameProps || (
    Item == 'a' ? {to: 'href'} : {}
  )
  const duplicate = props.duplicateProps || {}
  const remove = props.removeProps || {}

  return (
    <Container {...containerProps}>

      {itemEntries.map((itemEntry, i) => {
        return i+1 < count ? (

          separator ? (
            <span key={i}>
              <Item {...prepareProps(itemEntry[1], rename, duplicate, remove)} />
              {separator}
            </span>
          ) : (
            <Item key={i} {...prepareProps(itemEntry[1], rename, duplicate, remove)} />
          )

        ) : (

          <FinalItem key={i}
            {...prepareProps(itemEntry[1], rename, duplicate, remove)}
            {...finalProps}
          />

        )
      })}

    </Container>
  )
}

export const Breadcrumbs = withBreadcrumbsContainer(Breadcrumbs_)
