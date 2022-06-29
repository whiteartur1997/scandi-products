import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PRODUCT } from '../graphql/getProduct'
import Loader from './Loader'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { GetProductQuery } from '../generated-types/types'
import { Image } from './Image'
import { Gutter, Label, LabelSize } from './Label/Label'
import { Button } from './Button'

/*
 * STYLES
 */

const Wrapper = styled.div`
  display: flex;
`

const ImagesBlock = styled.div`
  width: 80px;
  margin-right: ${theme.spacingUnit * 5}px;
`

const ImageWrapper = styled.div`
  height: 80px;
  margin-bottom: ${theme.spacingUnit * 4}px;
`

const MainImageWrapper = styled.div`
  width: 42%;
  margin-right: ${theme.spacingUnit * 12}px;
`

const MainImage = styled(Image)`
  height: auto;
`

const ProductDetails = styled.div`
  max-width: 292px;
  margin-left: ${theme.spacingUnit * 12}px;
`

const Attributes = styled.div`
  margin-top: ${theme.spacingUnit * 4}px;
`

/*
 * COMPONENT
 */

const ProductPage = () => {
  const { id } = useParams()

  const { data, error, loading } = useQuery<GetProductQuery>(GET_PRODUCT, {
    variables: {
      id
    }
  })

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <h1>Error happened</h1>
  }

  const { attributes, gallery, brand, name } = data!.product!

  return (
    <Wrapper>
      <ImagesBlock>
        {data?.product?.gallery?.map((gallery) => (
          <ImageWrapper key={gallery}>
            <Image alt={name} src={gallery!} />
          </ImageWrapper>
        ))}
      </ImagesBlock>
      <MainImageWrapper>
        <MainImage alt={name} src={gallery![0] as string} />
      </MainImageWrapper>
      <ProductDetails>
        <Label fontWeight="600" size={LabelSize.L}>
          {name}
        </Label>
        <Label fontWeight="300" size={LabelSize.L} gutter={Gutter.Large}>
          {brand}
        </Label>
        <Attributes>
          {attributes?.map((attr) => (
            <div key={attr!.id}>
              <Label fontWeight="700" size={LabelSize.S} gutter={Gutter.Small}>
                {attr!.name}
              </Label>
              {attr!.items!.map((item) => {
                if (attr!.type === 'text') {
                  return (
                    <Button
                      backgroundColor={theme.main}
                      height={45}
                      key={item!.id}
                      width={63}
                      withBorder
                    >
                      {item!.displayValue}
                    </Button>
                  )
                }
              })}
            </div>
          ))}
        </Attributes>
      </ProductDetails>
    </Wrapper>
  )
}

export default ProductPage
