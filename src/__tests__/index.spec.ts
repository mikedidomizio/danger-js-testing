import { dangerTesting, dm, fail, markdown, message, warn } from '../'

describe('dangerTesting', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should call `fail` function if criteria not met', () => {
    const fn = () => {
      if (!dm.github.pr.title.match(/^\[\w+-\d+]/)) {
        fail(`PR title does not match expectation`)
      }
    }

    dangerTesting(fn, { github: { pr: { title: 'hello world' } } })
    expect(fail).toHaveBeenCalledWith('PR title does not match expectation')
    expect(fail).toHaveBeenCalledTimes(1)
    expect(markdown).not.toHaveBeenCalled()
    expect(message).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('should call `markdown` function if criteria not met', () => {
    const fn = () => {
      if (!dm.github.pr.title.match(/^\[\w+-\d+]/)) {
        markdown(`PR title does not match expectation`)
      }
    }

    dangerTesting(fn, { github: { pr: { title: 'hello world' } } })
    expect(markdown).toHaveBeenCalledWith('PR title does not match expectation')
    expect(markdown).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
    expect(message).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('should call `message` function if criteria not met', () => {
    const fn = () => {
      if (!dm.github.pr.title.match(/^\[\w+-\d+]/)) {
        message(`PR title does not match expectation`)
      }
    }

    dangerTesting(fn, { github: { pr: { title: 'hello world' } } })
    expect(message).toHaveBeenCalledWith('PR title does not match expectation')
    expect(message).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
    expect(markdown).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('should call `warning` function if criteria not met', () => {
    const fn = () => {
      if (!dm.github.pr.title.match(/^\[\w+-\d+]/)) {
        warn(`PR title does not match expectation`)
      }
    }

    dangerTesting(fn, { github: { pr: { title: 'hello world' } } })
    expect(warn).toHaveBeenCalledWith('PR title does not match expectation')
    expect(warn).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
    expect(markdown).not.toHaveBeenCalled()
    expect(message).not.toHaveBeenCalled()
  })
})
