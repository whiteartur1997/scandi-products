import Header from './components/Header'
import { useQuery } from '@apollo/client'
import { GET_CURRENCIES } from './graphql/getCurrencies'
import Loader from './components/Loader'
import { GetCategoriesQuery, GetCurrenciesQuery } from './generated-types/types'
import { GET_CATEGORIES } from './graphql/getCategories'
import { useLocation } from 'react-router-dom'

function App() {
  const { loading: categoriesAreLoading } =
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
    </div>
  )
}

export default App
