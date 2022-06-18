import React from 'react'
import { ReactComponent as Loading } from './../assets/images/loading.svg'
import styled from 'styled-components'

/*
 * STYLES
 */

const LoaderWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Loader = () => {
  return (
    <LoaderWrapper>
      <Loading />
    </LoaderWrapper>
  )
}

export default Loader
