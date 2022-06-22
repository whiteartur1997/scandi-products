import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

interface Props {
  backgroundColor?: string
  children?: React.ReactNode
  disabled?: boolean
  height?: number
  isLoading?: boolean
  isRound?: boolean
  width?: number
  withBorder?: boolean
}

/*
 * COMPONENT
 */

const ButtonComponent: React.FC<Props> = ({
  children,
  disabled = false,
  isRound,
  ...rest
}) => {
  return (
    <button disabled={disabled} {...rest}>
      {children}
    </button>
  )
}

export const Button = styled(ButtonComponent)<Props>`
  background-color: ${(props) => props.backgroundColor || theme.secondary};
  border-radius: ${(props) => (props.isRound ? '50%' : 0)};
  font-size: 16px;
  line-height: 1.2;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
  border: ${(props) => (props.withBorder ? `1px solid ${theme.main}` : 'none')};
  &:hover {
    filter: brightness(85%);
  }

  &:disabled {
    background-color: ${theme.disabled};
  }
`
