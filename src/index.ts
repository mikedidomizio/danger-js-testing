import * as danger from 'danger'

export let dm = danger

dm.fail = jest.fn()
dm.message = jest.fn()

export const fail = dm.fail
export const message = dm.message
export const warn = dm.warn

export const dangerTesting = (fn, obj) => {
  dm = {
   ...dm,
   ...obj
  }
  fn()
}
