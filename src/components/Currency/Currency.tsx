import React, { useState } from 'react'
import chevron from './../../assets/images/chevron-down-solid.svg'
import CurrencyList from './CurrencyList'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { GetCurrenciesQuery } from '../../generated-types/types'
import { GET_CURRENCIES } from '../../graphql/getCurrencies'

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

const Currency = () => {
  const [isCurrencyListOpen, setIsCurrencyListOpen] = useState(false)
  const client = useApolloClient()
  const currencies = client.readQuery<GetCurrenciesQuery>({
    query: GET_CURRENCIES
  })
  const [currentCurrency, setCurrentCurrency] = useState<string>(
    currencies!.currencies![0]!.symbol
  )
  const onChangeCurrentCurrency = (currentCurrency: string) => {
    setIsCurrencyListOpen(false)
    setCurrentCurrency(currentCurrency)
  }

  return (
    <CurrencyBlockWrapper>
      <CurrencyIndicator onClick={() => setIsCurrencyListOpen((prev) => !prev)}>
        {currentCurrency}
        <Chevron isOpen={isCurrencyListOpen} src={chevron} alt="chevron down" />
      </CurrencyIndicator>
      <CurrencyList
        currencies={currencies!.currencies}
        isOpen={isCurrencyListOpen}
        onChangeCurrentCurrency={onChangeCurrentCurrency}
      />
    </CurrencyBlockWrapper>
  )
}

export default Currency
