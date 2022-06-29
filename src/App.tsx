import Header from './components/Header'
import { useQuery } from '@apollo/client'
import { GET_CURRENCIES } from './graphql/getCurrencies'
import Loader from './components/Loader'
import {
  Currency,
  GetCategoriesQuery,
  GetCurrenciesQuery
} from './generated-types/types'
import { GET_CATEGORIES } from './graphql/getCategories'
import { Navigate, Route, Routes } from 'react-router-dom'
import { theme } from './styles/theme'
import styled from 'styled-components'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './components/ProductPage'
import { useCurrencyContext } from './context/currency/context'
import { useEffect } from 'react'

/*
 * STYLES
 */

const PageWrapper = styled.div`
  width: 90%;
  max-width: ${theme.containerWidth}px;
  padding: ${theme.spacingUnit * 20}px 0;
  margin: 0 auto;
`

/*
 * COMPONENT
 */

function App() {
  const { loading: categoriesAreLoading, data: categories } =
    useQuery<GetCategoriesQuery>(GET_CATEGORIES)
  const { loading: currenciesAreLoading, data: currencies } =
    useQuery<GetCurrenciesQuery>(GET_CURRENCIES)
  const { currency, currencyList, setCurrency, setCurrencyList } =
    useCurrencyContext()

  useEffect(() => {
    if (
      Boolean(currencies?.currencies) &&
      (!currency.label || !currency.symbol || currencyList.length === 0)
    ) {
      setCurrency({
        label: currencies!.currencies![0]!.label,
        symbol: currencies!.currencies![0]!.symbol
      })
      setCurrencyList(currencies!.currencies! as Currency[])
    }
  }, [currencies?.currencies, currency, setCurrencyList, setCurrency])

  if (currenciesAreLoading || categoriesAreLoading) {
    return <Loader />
  }

  return (
    <div>
      <Header />
      <PageWrapper>
        <Routes>
          <Route
            path="/"
            element={<CategoryPage categories={categories?.categories || []} />}
          />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageWrapper>
    </div>
  )
}

export default App
