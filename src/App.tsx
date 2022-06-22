import Header from './components/Header'
import { useQuery } from '@apollo/client'
import { GET_CURRENCIES } from './graphql/getCurrencies'
import Loader from './components/Loader'
import { GetCategoriesQuery, GetCurrenciesQuery } from './generated-types/types'
import { GET_CATEGORIES } from './graphql/getCategories'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { theme } from './styles/theme'
import styled from 'styled-components'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './components/ProductPage'

/*
 * STYLES
 */

const PageWrapper = styled.div`
  width: 90%;
  max-width: ${theme.containerWidth}px;
  padding: ${theme.spacingUnit * 20}px 0;
  margin: 0 auto;
`

function App() {
  const { loading: categoriesAreLoading, data: categories } =
    useQuery<GetCategoriesQuery>(GET_CATEGORIES)
  const { loading: currenciesAreLoading } =
    useQuery<GetCurrenciesQuery>(GET_CURRENCIES)

  const location = useLocation()

  console.log(location)

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
            element={<CategoryPage categories={categories.categories} />}
          />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageWrapper>
    </div>
  )
}

export default App
