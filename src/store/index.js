import { createStore, createEffect, createEvent } from 'effector'
import axios from 'axios'

export const $tasksList = createStore([])
export const $currentTask = createStore({})

export const editCurrentTaskEvent = createEvent('edit current task')
export const cancelEditCurrentTaskEvent = createEvent(
  'cancel edit current task'
)

export const loadTasksFx = createEffect({
  handler: async () => {
    const res = await axios.get('https://test.megapolis-it.ru/api/list')
    console.log('load tasks fx ', res.data)
    return res.data
  },
})

export const createTaskFx = createEffect({
  handler: async ({ title }) => {
    const res = await axios.post('https://test.megapolis-it.ru/api/list', {
      title,
    })
    console.log('create task fx ', res.data)
    return res.data
  },
})

export const updateTaskFx = createEffect({
  handler: async ({ id, title }) => {
    const res = await axios.post(
      `https://test.megapolis-it.ru/api/list/${id}`,
      { title }
    )
    console.log('update task fx ', res.data)
    return res.data
  },
})

export const deleteTaskFx = createEffect({
  handler: async ({ id }) => {
    const res = await axios.delete(
      `https://test.megapolis-it.ru/api/list/${id}`
    )
    console.log('delete task fx ', res.data)
    return res.data
  },
})

$tasksList
  .on(loadTasksFx.done, (_, { result }) => {
    if (result.success) {
      return result.data.sort((a, b) => a.id - b.id)
    }
    return []
  })
  .on(createTaskFx.done, (_, { params, result }) => {
    if (result.success) {
      return [..._, { id: result.id, title: params.title }]
    }
    return _
  })
  .on(updateTaskFx.done, (_, { result }) => result)
  .on(deleteTaskFx.done, (_, { params, result }) => {
    if (result.success) {
      return _.filter(task => task.id !== params.id)
    }
    return _
  })
  .watch(p => {
    console.log('task list ', p)
  })

$currentTask
  .on(editCurrentTaskEvent, (_, title) => {
    console.log('on edit _ ', _)
    console.log('on edit title ', title)
    return { ..._, title }
  })
  .on(cancelEditCurrentTaskEvent, (_, title) => _)
  .watch(el => {
    console.log('curr task ', el)
  })
