import React from 'react'
import styled from 'styled-components'
import { EditOutline } from '@styled-icons/evaicons-outline/EditOutline'
import { DeleteOutline } from '@styled-icons/material/DeleteOutline'

import Button from './Button'
import Input from './Input'
import { deleteTaskFx, updateTaskFx } from '../store'

const SytledDiv = styled.div`
  border: 1px solid gray;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const StyledControlGroup = styled.span`
  display: inline-block;
  max-width: 20%;
`

const StyledControl = styled.span`
  display: inline-block;
  width: 50%;
`

const StyledTaskNumber = styled.span`
  display: inline-block;
`

const StyledTaskDescription = styled.span`
  display: inline-block;
`

const Task = ({ task }) => {
  const { id, title } = task
  return (
    <SytledDiv>
      <StyledTaskNumber>{'Задача № ' + id}</StyledTaskNumber>
      <StyledTaskDescription>{title}</StyledTaskDescription>
      <StyledControlGroup>
        <StyledControl>
          <EditOutline
            onClick={() => {
              updateTaskFx({ id, title })
            }}
          />
        </StyledControl>
        <StyledControl>
          <DeleteOutline
            onClick={() => {
              deleteTaskFx({ id })
            }}
          />
        </StyledControl>
      </StyledControlGroup>
    </SytledDiv>
  )
}

export default Task
