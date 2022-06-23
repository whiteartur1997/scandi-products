import * as React from 'react'
import { Label, LabelSize } from '../components/Label/Label'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { GetCategoriesQuery, GetProductsQuery } from '../generated-types/types'
import { useGetQueryParameter } from '../hooks/useGetQueryParameter'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../graphql/getProducts'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'

/*
 * PROPS
 */

interface Props {
  categories: GetCategoriesQuery['categories']
}

/*
 * STYLES
 */

const CategoryTitle = styled(Label)`
  display: block;
  margin-bottom: ${theme.spacingUnit * 13}px;
`

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 386px);
  justify-content: space-evenly;
  row-gap: ${theme.spacingUnit * 13}px;
`

/*
 * COMPONENT
 */

const CategoryPage: React.FC<Props> = ({ categories }) => {
  const { queryParameter } = useGetQueryParameter('category')
  const queryVariable = categories?.find(
    (cat) => cat?.name?.toUpperCase() === queryParameter?.toUpperCase()
  )
  const { loading, data } = useQuery<GetProductsQuery>(GET_PRODUCTS, {
    variables: {
      title: queryVariable ? queryVariable?.name?.toLowerCase() : 'all'
    },
    fetchPolicy: 'network-only'
  })

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <CategoryTitle
        Component="h1"
        size={LabelSize.XL}
        textTransform="capitalize"
      >
        {data?.category?.name}
      </CategoryTitle>
      <ProductList>
        {data?.category?.products.map((product) => (
          <ProductCard key={product?.id} product={product!} />
        ))}
      </ProductList>
    </div>
  )
}

export default CategoryPage
