import React from 'react'
import styled, { css } from 'styled-components'
import { theme, ZIndex } from '../styles/theme'
import { Label, LabelSize } from './Label/Label'
import EmptyCart from './EmptyCart'
import { Button } from './Button'
import { Product } from '../generated-types/types'

/*
 * PROPS
 */

interface Props {
  product: Product
}

/*
 * STYLES
 */

const CartButton = styled(Button)`
  display: none;
  position: absolute;
  bottom: -10%;
  right: 10%;
  z-index: ${ZIndex.low};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 386px;
  max-width: 386px;
  padding: ${theme.spacingUnit * 2}px;

  &:hover {
    cursor: pointer;
    box-shadow: ${theme.boxShadow};

    ${CartButton} {
      display: block;
    }
  }
`

const ImageWrapper = styled.div<{ inStock: boolean }>`
  position: relative;
  height: 330px;
  width: 100%;

  ${({ inStock }) =>
    !inStock &&
    css`
      &:before {
        content: 'Out of stock';
        text-transform: uppercase;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: ${theme.disabled};
        font-size: ${LabelSize.M}px;
        width: 100%;
        text-align: center;
      }

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${theme.background};
        opacity: 0.5;
      }
    `}
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${theme.spacingUnit * 3}px;
`

const ProductCard: React.FC<Props> = ({ product }) => {
  const { inStock, name, gallery, prices } = product
  console.log('proces', prices)
  const imgSrc = (gallery && gallery[0]) || ''

  return (
    <Wrapper>
      <ImageWrapper inStock={Boolean(inStock)}>
        <Image src={imgSrc} alt={name} />
        <CartButton height={52} isRound={true} width={52}>
          <EmptyCart color={theme.background} />
        </CartButton>
      </ImageWrapper>
      <DetailsWrapper>
        <Label Component="h6" fontWeight="light" size={LabelSize.S}>
          {name}
        </Label>
        <Label fontWeight="medium" size={LabelSize.S}>
          $50.00
        </Label>
      </DetailsWrapper>
    </Wrapper>
  )
}

export default ProductCard
