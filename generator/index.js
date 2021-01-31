const fs = require('fs')

const makeOptionsComposition = require('./composition/options')
const makeTableComposition = require('./composition/table')
const makePanelComposition = require('./composition/panel')

const makeTemplateFragment = require('./component/template')
const makeScriptsFragment = require('./component/scripts')

module.exports = {
  makeCompositon: config => {
    makeOptionsComposition(config)
    makeTableComposition(config)
    makePanelComposition(config)
  },
  makeComponent: config => {
    const templateFragment = makeTemplateFragment(config)
    const scriptsFragment = makeScriptsFragment(config)

    const fragment = `
      ${templateFragment}

      ${scriptsFragment}

      <style lang="scss" scoped>
      </style>
    `

    fs.writeFileSync(path.resolve(config.output, './index.vue'), fragment)
  },
}