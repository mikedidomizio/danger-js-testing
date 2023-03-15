# Danger JS Testing

## About this project

This project was created to allow a developer to test their [DangerJS](https://github.com/danger/danger-js) `dangerfile` through Jest unit testing.
It also works with testing imported DangerJS plugins.

## Getting started

:warning: This project is currently going through ramp up development and has not been published.  This is not ready for production.

### Installation

Until published install via direct GitHub link

```shell
$ npm install --save-dev git@github.com:mikedidomizio/danger-js-testing.git
```

This project assumes that Danger and Jest are already installed in your project.

### Usage

Move dangerfile checks into a function or separate functions if you haven't done so previously.

```ts
// dangerfileFunctions.ts

// break your checks into functions that are exported.
// 📢 optionally, put all the functions inside a bigger function 
// that's exported to test closer to how Danger would report.
export const checkLineAdditions = () => {
  if (danger.github.pr.additions > 500) {
    warn('PR exceeds number of lines added')
  }
}

```

Create a test file like `dangerfile.spec.ts` to write your tests.

```ts
// dangerfile.spec.ts
import { dangerTesting, warn } from 'danger-js-testing'
import { checkLineAdditions } from '../dangerfile'

it('should call warn function if PR additions exceed 500 lines of code', async() => {
  await dangerTesting(checkLineAdditions, {
    github: {
      pr: {
        additions: 900,
      },
    },
  })

  expect(warn).toHaveBeenCalledWith(
    'PR exceeds number of lines added'
  )
  expect(warn).toHaveBeenCalledTimes(1)
})
```

## How it works

Takes inspiration from the [documentation on the Danger website](https://danger.systems/js/tutorials/transpilation.html#the-quot-danger-quot-module)
and myself wanting to have an easy way to test Danger during development.

The `dangerTesting` function accepts two arguments.  One is the `dangerfile` function you have
written for your tests.  The second is the mock override we attach to the global `danger` object.

When `dangerTesting` is called it updates the global mock and then calls the passed in function.

This module exports danger like global mock functions like `fail`, `markdown`, `message`, and `warn`,
to allow you to check that they are called as expected.
