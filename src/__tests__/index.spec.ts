import { dangerTesting, danger, fail, markdown, message, warn } from '../'

describe('dangerTesting', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call `fail` function if criteria not met', () => {
    const fn = () => {
      if (!danger.github.pr.title.match(/^\[\w+-\d+]/)) {
        fail(`this is a fail`)
      }
    }

    dangerTesting(fn, { github: { pr: { title: 'hello world' } } })
    expect(fail).toHaveBeenCalledWith('this is a fail')
    expect(fail).toHaveBeenCalledTimes(1)
    expect(markdown).not.toHaveBeenCalled()
    expect(message).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('should call `markdown` function if criteria not met', () => {
    const fn = () => {
      if (!danger.github.pr.title.match(/^\[\w+-\d+]/)) {
        markdown(`this is a markdown`)
      }
    }

    dangerTesting(fn, { github: { pr: { title: 'hello world' } } })
    expect(markdown).toHaveBeenCalledWith('this is a markdown')
    expect(markdown).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
    expect(message).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('should call `message` function if criteria not met', () => {
    const fn = () => {
      if (!danger.github.pr.title.match(/^\[\w+-\d+]/)) {
        message(`this is a message`)
      }
    }

    dangerTesting(fn, { github: { pr: { title: 'hello world' } } })
    expect(message).toHaveBeenCalledWith('this is a message')
    expect(message).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
    expect(markdown).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('should call `warning` function if criteria not met', () => {
    const fn = () => {
      if (!danger.github.pr.title.match(/^\[\w+-\d+]/)) {
        warn(`this is a warning`)
      }
    }

    dangerTesting(fn, { github: { pr: { title: 'this is a warning' } } })
    expect(warn).toHaveBeenCalledWith('this is a warning')
    expect(warn).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
    expect(markdown).not.toHaveBeenCalled()
    expect(message).not.toHaveBeenCalled()
  })

  it('should reset the global danger object between tests to ensure isolation', () => {
    expect(danger.github).toBeUndefined()
  })
})
