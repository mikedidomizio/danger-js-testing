// Example functions for dangerfile

export const fnFail = () => {
  if (!danger.github.pr.title.match(/^\[\w+-\d+]/)) {
    fail(`this is a fail`)
  }
}

export const fnMarkdown = () => {
  if (!danger.github.pr.title.match(/^\[\w+-\d+]/)) {
    markdown(`this is a markdown`)
  }
}

export const fnMessage = () => {
  if (!danger.github.pr.title.match(/^\[\w+-\d+]/)) {
    message(`this is a message`)
  }
}

export const fnWarn = () => {
  if (!danger.github.pr.title.match(/^\[\w+-\d+]/)) {
    warn(`this is a warning`)
  }
}
