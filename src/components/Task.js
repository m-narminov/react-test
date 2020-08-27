import React from 'react'
import styled from 'styled-components'
import { EditOutline } from '@styled-icons/evaicons-outline/EditOutline'
import { DeleteOutline } from '@styled-icons/material/DeleteOutline'

import { deleteTaskFx, updateTaskFx } from '../store'

const SytledDiv = styled.div`
  border: 1px solid gray;
  display: grid;
  grid-template-columns: 15% 1fr 15%;
`

const StyledControlGroup = styled.span`
  display: inline-block;
`

const StyledControl = styled.span`
  display: inline-block;
  width: 50%;
  &:hover {
    cursor: pointer;
  }
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
