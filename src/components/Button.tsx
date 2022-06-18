import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

interface Props {
  backgroundColor?: string
  hasBorder?: boolean
  isLoading?: boolean
  isRound?: boolean
}

const ButtonComponent: React.FC<Props> = () => {
  return <button></button>
}

const Button = styled(ButtonComponent)<Props>`
  color: ${(props) => props.backgroundColor || theme.secondary};
  font-size: 16px;
  line-height: 1.2;
  text-align: center;
  vertical-align: middle;
`

export default Button
