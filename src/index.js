import React, { Children } from 'react'
import PropTypes from 'prop-types'

import {
  ThroughProvider,
  throughContainer,
  throughAgent,
  createAdvAgent,
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

export const BreadcrumbsItem = createAdvAgent(breadcrumbsThroughArea, breadcrumbsBearingKey)


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

const defaultCompare = (a, b) => (
    a[breadcrumbsBearingKey].length - b[breadcrumbsBearingKey].length
)

const Breadcrumbs_ = (props) => {
  const {
      container: Container = 'span',
      containerProps,
      hideIfEmpty = false,
      item: Item = 'a',
      finalItem: FinalItem = Item,
      finalProps = {},
      separator,
      duplicateProps: duplicate = {},
      removeProps: remove  = {},
      renameProps: rename = (Item === 'a' ? {to: 'href'} : {}),
      compare
  } = props
  const data = props[breadcrumbsThroughArea]
  const itemsValue = Object
      .keys(data)
      .map(k => data[k])
      .sort(compare || defaultCompare)
  const count = itemsValue.length

  if (hideIfEmpty && count === 0) {
    return null
  }

  return (
    <Container {...containerProps}>

      {itemsValue.map((itemValue, i) => {
        return i+1 < count ? (

          separator ? (
            <span key={i}>
              <Item {...prepareProps(itemValue, rename, duplicate, remove)} />
              {separator}
            </span>
          ) : (
            <Item key={i} {...prepareProps(itemValue, rename, duplicate, remove)} />
          )

        ) : (

          <FinalItem key={i}
            {...prepareProps(itemValue, rename, duplicate, remove)}
            {...finalProps}
          />

        )
      })}

    </Container>
  )
}

export const Breadcrumbs = withBreadcrumbsContainer(Breadcrumbs_)
