import { createContext, useContext } from 'react'
import { Currency } from '../../generated-types/types'

/*
 * TYPES
 */

interface CurrencyContextType {
  currency: Currency
  currencyList: Currency[]
  setCurrency: (currency: Currency) => void
  setCurrencyList: (list: Currency[]) => void
}

/*
 * CONTEXT
 */

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: {
    label: '',
    symbol: ''
  },
  currencyList: [],
  setCurrency: (props) => props,
  setCurrencyList: (props) => props
})

/*
 * HOOK
 */

export const useCurrencyContext = () => {
  const { currency, currencyList, setCurrency, setCurrencyList } =
    useContext(CurrencyContext)

  return {
    currency,
    currencyList,
    setCurrency,
    setCurrencyList
  }
}
