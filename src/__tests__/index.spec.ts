import { danger, dangerTesting, fail, markdown, message, warn } from '../'
import { fnFail, fnMarkdown, fnMessage, fnWarn } from './dangerfileFunctions'

describe('dangerTesting', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should not call anything if Danger function matches criteria', () => {
    dangerTesting(fnFail, { github: { pr: { title: '[Great-123]' } } })
    expect(fail).not.toHaveBeenCalled()
  })

  it('should call `fail` function if criteria not met', () => {
    dangerTesting(fnFail, { github: { pr: { title: 'bad title' } } })
    expect(fail).toHaveBeenCalledWith('this is a fail')
    expect(fail).toHaveBeenCalledTimes(1)
    expect(markdown).not.toHaveBeenCalled()
    expect(message).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('should call `markdown` function if criteria not met', () => {
    dangerTesting(fnMarkdown, { github: { pr: { title: 'bad title' } } })
    expect(markdown).toHaveBeenCalledWith('this is a markdown')
    expect(markdown).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
    expect(message).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('should call `message` function if criteria not met', () => {
    dangerTesting(fnMessage, { github: { pr: { title: 'bad title' } } })
    expect(message).toHaveBeenCalledWith('this is a message')
    expect(message).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
    expect(markdown).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('should call `warning` function if criteria not met', () => {
    dangerTesting(fnWarn, { github: { pr: { title: 'bad title' } } })
    expect(warn).toHaveBeenCalledWith('this is a warning')
    expect(warn).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
    expect(markdown).not.toHaveBeenCalled()
    expect(message).not.toHaveBeenCalled()
  })

  it('should reset the global danger object between tests to ensure isolation', () => {
    expect(danger.github).toBeUndefined()
    expect(fail).not.toHaveBeenCalled()
    expect(markdown).not.toHaveBeenCalled()
    expect(message).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })
})
