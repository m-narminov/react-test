import React, { useEffect } from 'react'
import { useList } from 'effector-react'

import {
  $tasksList,
  loadTasksFx,
  createTaskFx,
  updateTaskFx,
  deleteTaskFx,
} from './store'
import Task from './components/Task'
import Button from './components/Button'
import './App.css'

function App() {
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
        Список задач <Button type={'outlined'} value={'Добавить'} />
      </p>
      <ul>{tasksList}</ul>
    </div>
  )
}

export default App
