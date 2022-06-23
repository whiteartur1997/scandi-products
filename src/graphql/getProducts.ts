import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query GetProducts($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        name
        inStock
        id
        gallery
        prices {
          currency {
            symbol
            label
          }
          amount
        }
      }
    }
  }
`
