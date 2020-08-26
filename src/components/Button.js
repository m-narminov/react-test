import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  color: ${props => (props.type === 'outlined' ? '#000' : '#fff')};
`

const Button = ({ value, type, ...props }) => {
  return <StyledButton>{props.title}</StyledButton>
}

export default Button
