import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query GetProducts($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            symbol
            label
          }
          amount
        }
        brand
      }
    }
  }
`
