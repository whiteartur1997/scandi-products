import React, { useState } from 'react'
import { CurrencyContext } from './context'
import { Currency } from '../../generated-types/types'

/*
 * PROPS
 */

interface Props {
  children: React.ReactNode
}

/*
 * COMPONENT
 */

const CurrencyProvider: React.FC<Props> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>({
    label: '',
    symbol: ''
  })

  const [currencyList, setCurrencyList] = useState<Currency[]>([])

  const onCurrencySet = (currency: Currency) => setCurrency(currency)
  const onCurrencyListSet = (currencyList: Currency[]) =>
    setCurrencyList(currencyList)

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencyList,
        setCurrency: onCurrencySet,
        setCurrencyList: onCurrencyListSet
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export default CurrencyProvider
