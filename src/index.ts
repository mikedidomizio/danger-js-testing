import * as danger1 from 'danger'
import { DangerDSLType } from 'danger'

export let danger = danger1 as any

danger.fail = jest.fn()
danger.markdown = jest.fn()
danger.message = jest.fn()
danger.warn = jest.fn()

export const fail = danger.fail
export const markdown = danger.markdown
export const message = danger.message
export const warn = danger.warn

// we set the global danger to ensure it doesn't come back undefined
global.danger = danger

global.fail = fail
global.markdown = markdown
global.message = message
global.warn = warn

// https://stackoverflow.com/a/49935138
type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<NestedPartial<R>>
    : NestedPartial<T[K]>
}

jest.mock('danger', () => jest.fn())

/**
 * Sets up the danger expectation
 * @param fn  this is a function that will execute that will test danger
 * @param dangerObject this is the danger object that we expect back
 */
export const dangerTesting = (
  fn: Function,
  dangerObject: NestedPartial<DangerDSLType>,
) => {
  danger = {
    ...danger,
    ...dangerObject,
  }

  // we override the global danger
  // todo ensure that it resets each time to ensure proper isolation
  global.danger = danger
  fn()
}
