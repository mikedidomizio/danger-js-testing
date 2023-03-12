import { dangerTesting, dm } from '../'

jest.mock('danger', () => jest.fn())

describe('dangerTest', () => {
  it('should validate with `message` function', () => {
    const fn = () => {
      if (!dm.github?.pr.title.match(/^\[\w+-\d+]/)) {
        dm.message(`PR title does not match expectation`)
      }
    }

    dangerTesting(fn, { github: { pr: { title: 'hello world' } } })
    expect(dm.message).toHaveBeenCalledWith(
      'PR title does not match expectation',
    )
    expect(dm.message).toHaveBeenCalledTimes(1)
  })
})
