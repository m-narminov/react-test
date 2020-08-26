import { createStore, createEffect, createEvent } from 'effector'
import axios from 'axios'

export const $tasksList = createStore([])

export const loadTasksFx = createEffect({
  handler: async () => {
    const res = await axios.get('https://test.megapolis-it.ru/api/list')
    return res.data
  },
})

export const createTaskFx = createEffect({
  handler: async ({ title }) => {
    const res = await axios.post('https://test.megapolis-it.ru/api/list', {
      title,
    })
    return res.data
  },
})

export const updateTaskFx = createEffect({
  handler: async ({ id, title }) => {
    const res = await axios.post(
      `https://test.megapolis-it.ru/api/list/${id}`,
      { title }
    )
    return res.data
  },
})

export const deleteTaskFx = createEffect({
  handler: async ({ id }) => {
    const res = await axios.get(`https://test.megapolis-it.ru/api/list/${id}`)
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
  .on(createTaskFx.done, (_, { result }) => {
    if (result.success) {
      return [_, ...result.data]
    }
    return _
  })
  .on(updateTaskFx.done, (_, { result }) => result)
  .on(deleteTaskFx.done, (_, { id }) => _.filter(task => task.id !== id))
