// import * as danger1 from 'danger'
import { DangerDSLType } from 'danger'

export let danger // = danger1 as any

export const fail = jest.fn()
export const markdown = jest.fn()
export const message = jest.fn()
export const warn = jest.fn()

// we set the global danger to ensure it doesn't come back undefined
global.danger = danger

// @ts-ignore
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

// ensures accessing the global danger object doesn't throw an error
jest.mock('danger', () => jest.fn())

/**
 * Sets up the danger expectation
 * @param fn  this is a function that will execute that will test danger
 * @param dangerObject this is the danger object that we expect back
 */
export const dangerTesting = async (
  fn: Function,
  dangerObject: NestedPartial<DangerDSLType>,
) => {
  global.danger = {
    ...danger,
    ...dangerObject,
  }
  await fn()
}
