import type { DangerDSLType } from 'danger'

declare global {
  var danger: DangerDSLType
  // global fail declared because of Jest
  // node_modules/@types/jest/index.d.ts
  // var fail: any
  var markdown: any
  var message: any
  var warn: any
}
