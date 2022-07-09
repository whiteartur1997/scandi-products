import React, { useState } from 'react'
import chevron from '../assets/images/chevron-down-solid.svg'
import CurrencyList from './CurrencyList'
import styled from 'styled-components'
import { Currency } from '../generated-types/types'
import { useCurrencyContext } from '../context/currency/context'

/*
 * STYLES
 */

const CurrencyBlockWrapper = styled.div`
  position: relative;
`

const CurrencyIndicator = styled.div`
  width: 38px;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`

const Chevron = styled.img<{ isOpen: boolean }>`
  width: 12px;
  transition: 300ms;
  transform: ${(props) => props.isOpen && 'rotate(180deg)'};
`

/*
 * COMPONENT
 */

const CurrencyComponent = () => {
  const [isCurrencyListOpen, setIsCurrencyListOpen] = useState(false)
  const { currency, currencyList, setCurrency } = useCurrencyContext()
  const onChangeCurrentCurrency = (currentCurrency: Currency) => {
    setIsCurrencyListOpen(false)
    setCurrency(currentCurrency)
  }

  return (
    <CurrencyBlockWrapper>
      <CurrencyIndicator onClick={() => setIsCurrencyListOpen((prev) => !prev)}>
        {currency.symbol}
        <Chevron isOpen={isCurrencyListOpen} src={chevron} alt="chevron down" />
      </CurrencyIndicator>
      <CurrencyList
        currencies={currencyList}
        isOpen={isCurrencyListOpen}
        onChangeCurrentCurrency={onChangeCurrentCurrency}
      />
    </CurrencyBlockWrapper>
  )
}

export default CurrencyComponent
