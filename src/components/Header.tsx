import React from 'react'
import styled from 'styled-components'
import Tabs from './Tabs/Tabs'
import logo from './../assets/images/a-logo.svg'
import Currency from './Currency/Currency'
import { GetCategoriesQuery } from '../generated-types/types'
import { useApolloClient } from '@apollo/client'
import { GET_CATEGORIES } from '../graphql/getCategories'

/*
 * STYLES
 */

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  max-width: 1440px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

/*
 * COMPONENTS
 */

const Header = () => {
  const client = useApolloClient()
  const categories = client.readQuery<GetCategoriesQuery>({
    query: GET_CATEGORIES
  })

  const tabItems = categories?.categories?.map(
    (category) => category?.name as string
  )

  return (
    <Wrapper>
      <Container>
        <Tabs items={tabItems || []} />
        <img src={logo} alt="Logo" />
        <Currency />
      </Container>
    </Wrapper>
  )
}

export default Header
