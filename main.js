const { fstat } = require('fs')
const fs = require('fs')
const path = require('path')
const generator = require('./generator')

const files = fs.readdirSync('./configs')

const configs = files.map(file => {
  const code = fs.readFileSync(path.resolve(__dirname, './configs', file), 'utf-8')
  return eval(code)
})

const root = path.resolve(__dirname, './output')

configs
  .map(config => {
    console.log(path.resolve(root, config.output));
    return {
      ...config,
      output: path.resolve(root, config.output)
    }
  })
  .forEach(config => {
    console.log(config.output);
    generator.makeCompositon(config)
    generator.makeComponent(config)
  })