import { exec } from 'child_process'

export function betterRequire (absolutePath) {
  const module = require(absolutePath)
  return exports.__esModule && module.default ? module.default : module
}
