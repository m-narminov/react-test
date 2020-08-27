import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  border: ${props =>
    props.isOutlined ? '1px solid ' + props.borderColor : ''};
  color: ${props => (props.isOutlined ? '#000' : '#fff')};
  background-color: ${props => (props.isOutlined ? '#fff' : '')};
`

const Button = ({ value, type, level, onClick, ...props }) => {
  const isOutlined = type === 'outlined'
  const borderColor = isOutlined
    ? level === 'danger'
      ? 'red'
      : level === 'warning'
      ? 'yellow'
      : level === 'success'
      ? 'green'
      : ''
    : ''
  return (
    <StyledButton isOutlined borderColor onClick={onClick}>
      {value}
    </StyledButton>
  )
}

export default Button
