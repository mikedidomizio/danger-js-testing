# Danger JS Testing

![install size](https://badgen.net/packagephobia/install/danger-testing)

## About this project

This project was created to allow a developer to test their [DangerJS](https://github.com/danger/danger-js) `dangerfile` through Jest unit testing.
It also works with testing imported DangerJS plugins.

This package requires zero dependencies and is under 10 kB.  

## Getting started

:warning: This project is currently going through ramp up development.  
Some things may change, some things may not work.  Submit issues if you find any.

This package requires a minimum Danger and Jest version to function
but it may function with future and previous versions as well.  Create an issue/discussion if you test a version 
outside the required versions that you have found that works.

### Installation

```shell
$ npm install danger-testing --save-dev
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
