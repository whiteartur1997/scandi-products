export const theme = {
  background: '#FFFFFF',
  boxShadow: '0px 4px 35px rgba(168, 172, 176, 0.19)',
  containerWidth: 1440,
  disabled: '#8D8F9A',
  hoverBackground: '#EEEEEE',
  main: '#1D1F22',
  secondary: '#5ECE7B',
  secondaryHover: '#53B56D',
  spacingUnit: 8
}

export enum Resolution {
  laptop = 960,
  tablet = 740,
  mobile = 414
}

export enum ZIndex {
  low = 10,
  medium = 100,
  high = 1000
}

export type ThemeType = typeof theme
