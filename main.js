const { fstat } = require('fs')
const fs = require('fs')
const path = require('path')
const generator = require('./generator')

const files = fs.readdirSync('./configs')

const configs = files.map(file => {
  const code = fs.readFileSync(path.resolve(__dirname, './configs', file), 'utf-8')
  return eval(code)
})

// const root = path.resolve(__dirname, './output')
const root = '/home/excella/studio/project/public/SDC/devops/web/src/views'

configs
  .map(config => {
    return {
      ...config,
      output: path.resolve(root, config.output)
    }
  })
  .forEach(config => {
    generator.makeCompositon(config)
    generator.makeComponent(config)
  })