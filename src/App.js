import React, { useEffect, useState } from 'react'
import { useList, useStore, useEvent } from 'effector-react'
import styled from 'styled-components'

import {
  $tasksList,
  $currentTask,
  editCurrentTaskEvent,
  cancelEditCurrentTaskEvent,
  loadTasksFx,
  createTaskFx,
  updateTaskFx,
  deleteTaskFx,
} from './store'
import Task from './components/Task'
import Button from './components/Button'
import Input from './components/Input'
import './App.css'

const StyledClose = styled.span`
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
  &:before,
  &:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`

const StyledModal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`

//Взаимодействие c API:

//Получения списка:
//url: https://test.megapolis-it.ru/api/list
//type: GET
//Модель: Object<data: Array, length: Number, success: Bool, error: String>
//Описание: Метод вернёт список всех задач

//Создание:
//url: https://test.megapolis-it.ru/api/list
//type: POST
//Модель(Request): Object<title: String>
//Модель(Response): Object<id: Number, success: Bool, error: String>
//Описание: Метод создаст новую запись и вернет ее идентификатор

//Редактирование:
//url: https://test.megapolis-it.ru/api/list/{ID}
//type: POST
//Модель(Request): Object<title: String>
//Модель(Response): Object<success: Bool, error: String>
//Описание: Метод изменит данные

//Удаление:
//url: https://test.megapolis-it.ru/api/list/{ID}
//type: DELETE
//Модель(Response): Object<success: Bool, error: String>
//Описание: Метод удаляет запись

function App() {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalMode, setModalMode] = useState('creation')
  const currentTask = useStore($currentTask)
  console.log('currentTask = ', currentTask)

  const tasksList = useList($tasksList, task => <Task task={task} />)
  useEffect(() => {
    async function fetchTasks() {
      await loadTasksFx()
    }
    fetchTasks()
  }, [])
  return (
    <div className='App'>
      <p>
        Список задач{' '}
        <Button
          onClick={() => {
            setModalVisible(true)
            setModalMode('creation')
          }}
          type='outlined'
          value={'Добавить'}
        />
      </p>
      <ul>{tasksList}</ul>
      {modalVisible ? (
        <StyledModal>
          <Input onChange={editCurrentTaskEvent} value={currentTask.title} />
          <Button
            value={modalMode === 'creation' ? 'Создать' : 'Сохранить'}
            onClick={() => {
              if (modalMode === 'creation') {
                createTaskFx({ title: currentTask.title })
              } else {
                updateTaskFx({ id: currentTask.id, title: currentTask.title })
              }
            }}
          />
          <StyledClose
            onClick={() => {
              setModalVisible(false)
            }}
          />
        </StyledModal>
      ) : (
        ''
      )}
    </div>
  )
}

export default App
