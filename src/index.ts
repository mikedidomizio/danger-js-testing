import * as danger from 'danger'

export let dm = danger as any

dm.fail = jest.fn()
dm.markdown = jest.fn()
dm.message = jest.fn()
dm.warn = jest.fn()

export const fail = dm.fail
export const markdown = dm.markdown
export const message = dm.message
export const warn = dm.warn

jest.mock('danger', () => jest.fn())

export const dangerTesting = (fn: Function, obj) => {
  dm = {
    ...dm,
    ...obj,
  }
  fn()
}
