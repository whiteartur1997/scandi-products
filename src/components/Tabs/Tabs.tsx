import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

/*
 * TYPES
 */

interface Props {
  items: string[]
}

/*
 * STYLES
 */

const TabsWrapper = styled.div<{ width?: number; positionLeft?: number }>`
  width: auto;
  height: 68px;
  position: relative;
  display: flex;
  &:after {
    content: '';
    background-color: ${theme.secondary};
    height: 2px;
    width: ${(p) => `${p.width}px` || '20px'};
    position: absolute;
    bottom: 0;
    left: ${(p) => `${p.positionLeft}px` || '20px'};
    transition: all 500ms ease;
  }
`

const TabItem = styled.div`
  height: auto;
  width: auto;
  padding: 0 ${theme.spacingUnit * 2}px;
  cursor: pointer;
  transition: background-color 500ms ease;

  &:hover {
    background-color: ${theme.hoverBackground};
  }
`

/*
 * COMPONENT
 */

const Tabs: React.FC<Props> = ({ items }) => {
  const [activeTabParams, setActiveTabParams] = useState<{
    width?: number
    positionLeft?: number
  }>()
  const [activeTab, setActiveTab] = useState(items[0])
  const activeTabRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    setActiveTabParams({
      width: activeTabRef.current?.clientWidth,
      positionLeft: activeTabRef.current?.offsetLeft
    })
  }, [activeTab, activeTabRef])

  return (
    <TabsWrapper {...activeTabParams}>
      {items.map((item) => (
        <TabItem
          ref={activeTab === item ? activeTabRef : null}
          key={item}
          onClick={() => setActiveTab(item)}
        >
          {item.toUpperCase()}
        </TabItem>
      ))}
    </TabsWrapper>
  )
}

export default Tabs
