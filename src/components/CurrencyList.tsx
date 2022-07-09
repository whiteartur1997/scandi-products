import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { CSSTransition, TransitionStatus } from 'react-transition-group'
import { Currency } from '../generated-types/types'

/*
 * PROPS
 */

interface Props {
  currencies: Currency[]
  isOpen: boolean
  onChangeCurrentCurrency: (currentCurrency: Currency) => void
}

/*
 * STYLES
 */
const appearDuration = 300
const transitionName = 'currency-list'

const ListWrapper = styled.ul<{ state: TransitionStatus }>`
  width: 114px;
  list-style: none;
  box-shadow: ${theme.boxShadow};
  background-color: ${theme.background};
  position: absolute;
  left: -30px;
  transition: opacity ${appearDuration}ms, bottom ${appearDuration}ms;

  &.${transitionName}-enter {
    opacity: 0;
    bottom: -140px;
  }
  &.${transitionName}-enter-active {
    opacity: 1;
    bottom: -180px;
  }
  &.${transitionName}-enter-done {
    bottom: -180px;
  }
  &.${transitionName}-exit {
    opacity: 0;
    bottom: -180px;
  }
  &.${transitionName}-exit-active {
    opacity: 0.5;
    bottom: -140px;
  }
  &.${transitionName}-exit-done {
    opacity: 0;
    bottom: -140px;
  }
`

const ListItem = styled.li`
  padding: ${theme.spacingUnit}px ${theme.spacingUnit * 2.5}px;

  &:hover {
    background-color: ${theme.hoverBackground};
  }
`

const CurrencyList: React.FC<Props> = ({
  currencies,
  isOpen,
  onChangeCurrentCurrency
}) => {
  return (
    <CSSTransition
      in={isOpen}
      timeout={appearDuration}
      appear={true}
      mountOnEnter={true}
      unmountOnExit={true}
      classNames={transitionName}
    >
      {(state) => (
        <ListWrapper state={state}>
          {currencies.map((cur) => {
            return (
              <ListItem
                key={cur.label}
                onClick={() => onChangeCurrentCurrency(cur)}
              >
                {cur.symbol} {cur.label}
              </ListItem>
            )
          })}
        </ListWrapper>
      )}
    </CSSTransition>
  )
}

export default CurrencyList
