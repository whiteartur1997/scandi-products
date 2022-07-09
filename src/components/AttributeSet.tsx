import React, { useState } from 'react'
import styled from 'styled-components'
import { Label, LabelSize } from './Label'
import { Attribute } from '../generated-types/types'
import { theme } from '../styles/theme'

/*
 * TYPES
 */

interface Props {
  name: string
  items: Attribute[]
  type: string
}

/*
 * STYLES
 */

const AttributeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const AttributeListWrapper = styled.ul`
  display: flex;
  margin-bottom: ${theme.spacingUnit * 4}px;
`

const AttributeSwatchItem = styled.li<{
  backgroundColor?: string
  isSelected: boolean
}>`
  display: inline-block;
  height: 32px;
  width: 32px;
  cursor: pointer;
  border-image: ${(props) =>
    props.isSelected
      ? `linear-gradient(#FFF, ${theme.secondary}) 1px 1px`
      : 'unset'};
`

const AttributeTextItem = styled.li<{
  backgroundColor: string
  isSelected: boolean
}>`
  display: flex;
  align-items: center;
  border: 1px solid ${theme.main};
  height: 45px;
  padding: 0 ${theme.spacingUnit * 3}px;
  cursor: pointer;
  background-color: ${(p) => (p.isSelected ? theme.main : theme.background)};
  & * {
    color: ${(p) => (p.isSelected ? theme.background : theme.main)};
  }

  &:not(:last-child) {
    margin-right: ${theme.spacingUnit * 1.5}px;
  }
`

/*
 * COMPONENT
 */

const AttributeSet: React.FC<Props> = ({ items, name, type }) => {
  const [selectedAttribute, setSelectedAttribute] = useState(items[0])

  const onAttributeClick = (attribute: Attribute) => {
    setSelectedAttribute(attribute)
  }

  const isSwatchItem = type === 'swatch'

  const AttributeItem = isSwatchItem ? AttributeSwatchItem : AttributeTextItem

  return (
    <AttributeWrapper>
      <Label inline={false} fontWeight="700" size={LabelSize.S}>
        {name}:
      </Label>
      <AttributeListWrapper>
        {items.map((item) => (
          <AttributeItem
            key={item.id}
            backgroundColor={isSwatchItem ? item.value! : undefined}
            isSelected={selectedAttribute.id === item.id}
            onClick={() => onAttributeClick(item)}
          >
            {!isSwatchItem && (
              <Label fontWeight="300" size={LabelSize.XS}>
                {item.displayValue}
              </Label>
            )}
          </AttributeItem>
        ))}
      </AttributeListWrapper>
    </AttributeWrapper>
  )
}

export default AttributeSet
