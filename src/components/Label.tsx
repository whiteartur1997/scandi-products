import React from 'react'
import styled, { css } from 'styled-components'
import { theme } from '../styles/theme'

/*
 * TYPES
 */

type FontWeight = '300' | '400' | '500' | '600' | '700'
type LabelComponent = 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
type TextTransform = 'capitalize' | 'lowercase' | 'uppercase' | 'none'

export enum LabelSize {
  XL = 42,
  L = 30,
  M = 24,
  S = 18,
  XS = 16
}

export enum Gutter {
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
}

/*
 * STYLES
 */

const defaultProps: LabelProps = {
  color: theme.main,
  Component: 'span',
  fontWeight: '400',
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
    case '300':
      return 'font-family: Raleway-Light, sans-serif;'
    case '500':
      return 'font-family: Raleway-Medium, sans-serif;'
    case '600':
      return 'font-family: Raleway-SemiBold, sans-serif;'
    case '700':
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
