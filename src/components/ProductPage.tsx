import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PRODUCT } from '../graphql/getProduct'
import Loader from './Loader'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { Attribute, GetProductQuery } from '../generated-types/types'
import { Image } from './Image'
import { Gutter, Label, LabelSize } from './Label'
import AttributeSet from './AttributeSet'
import { useCurrencyContext } from '../context/currency/context'
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
  margin: ${theme.spacingUnit * 4}px 0;
`

const PriceWrapper = styled.div`
  margin-bottom: ${theme.spacingUnit * 2.5}px;
`

const Description = styled.p`
  font-weight: 400;
  font-size: ${LabelSize.XS}px;
  margin-top: ${theme.spacingUnit * 5}px;
`

/*
 * COMPONENT
 */

const ProductPage = () => {
  const { id } = useParams()
  const { currency } = useCurrencyContext()
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

  const { attributes, gallery, brand, name, prices, description } =
    data!.product!
  const currentPrice =
    prices.find((price) => price.currency.label === currency.label) ?? prices[0]
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
            <AttributeSet
              key={attr!.id}
              name={attr!.name!}
              items={attr!.items! as Attribute[]}
              type={attr!.type!}
            />
          ))}
        </Attributes>
        <PriceWrapper>
          <Label
            inline={false}
            fontWeight="700"
            size={LabelSize.S}
            gutter={Gutter.Small}
          >
            Price:
          </Label>
          <Label inline={false} fontWeight="700" size={LabelSize.M}>
            {`${currentPrice.currency.symbol} ${currentPrice.amount}`}
          </Label>
        </PriceWrapper>
        <Button width={292} height={52}>
          Add to cart
        </Button>
        <Description>{description}</Description>
      </ProductDetails>
    </Wrapper>
  )
}

export default ProductPage
