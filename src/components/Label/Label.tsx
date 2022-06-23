import React from 'react'
import styled, { css } from 'styled-components'
import { theme } from '../../styles/theme'

/*
 * TYPES
 */

type FontWeight = 'light' | 'normal' | 'medium' | 'semi-bold' | 'bold'
type LabelComponent = 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
type TextTransform = 'capitalize' | 'lowercase' | 'uppercase' | 'none'

export enum LabelSize {
  XL = 42,
  L = 30,
  M = 24,
  S = 18,
  XS = 16
}

enum Gutter {
  No,
  Small,
  Medium,
  Large
}

interface LabelProps {
  Component?: LabelComponent
  children?: React.ReactNode
  color?: string
  fontWeight?: FontWeight
  gutter?: Gutter
  inline?: boolean
  size?: LabelSize
  textTransform?: TextTransform
  textWrap?: TextWrap
}

/*
 * STYLES
 */

const defaultProps: LabelProps = {
  color: theme.main,
  Component: 'span',
  fontWeight: 'normal',
  gutter: Gutter.No,
  inline: true,
  size: LabelSize.M,
  textTransform: 'none'
}

const labelDisplay = (p: LabelProps) => {
  if (p.inline === false) {
    return 'display: block;'
  } else if (p.gutter !== Gutter.No) {
    return 'display: inline-block;'
  } else {
    return 'display: inline;'
  }
}

const fontWeightToFont = (fontWeight: FontWeight) => {
  switch (fontWeight) {
    case 'light':
      return 'font-family: Raleway-Light, sans-serif;'
    case 'medium':
      return 'font-family: Raleway-Medium, sans-serif;'
    case 'semi-bold':
      return 'font-family: Raleway-SemiBold, sans-serif;'
    case 'bold':
      return 'font-family: Raleway-Bold, sans-serif;'
    default:
      return 'font-family: Raleway-Regular, sans-serif;'
  }
}

const labelCss = (props: LabelProps = defaultProps) => css`
  ${labelDisplay}
  ${fontWeightToFont(props.fontWeight!)}
  ${() => `
    color: ${props.color};
    font-size: ${props.size}px;
    font-weight: ${props.fontWeight};
    line-height: 1.5;
    margin: 0 0 ${theme.spacingUnit * props.gutter!}px;
    text-transform: ${props.textTransform};
  `}
`

/*
 * COMPONENT
 */

const LabelComponent: React.FC<LabelProps> = ({
  Component = 'span',
  color,
  fontWeight,
  gutter,
  inline,
  size,
  textTransform,
  textWrap,
  ...rest
}) => {
  return <Component {...rest} />
}

/*
 * STYLED COMPONENT
 */

export const Label = styled(LabelComponent)`
  ${labelCss}
`
Label.defaultProps = defaultProps
