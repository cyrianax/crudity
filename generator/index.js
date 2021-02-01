const fs = require('fs')
const path = require('path')

const { beautify } = require('./utils')

const makeOptionsComposition = require('./composition/options')
const makeTableComposition = require('./composition/table')
const makePanelComposition = require('./composition/panel')

const makeTemplateFragment = require('./component/template')
const makeScriptFragment = require('./component/script')

module.exports = {
  makeCompositon: config => {
    makeOptionsComposition(config)
    makeTableComposition(config)
    makePanelComposition(config)
  },
  makeComponent: config => {
    const templateFragment = makeTemplateFragment(config)
    const scriptFragment = makeScriptFragment(config)

    const fragment = beautify(`
      <template>
        <div>
          ${templateFragment}
        </div>
      </template>

      <script setup>
        ${scriptFragment}
      </script>

      <style lang="scss" scoped>
      </style>
    `, 'vue')

    fs.writeFileSync(path.resolve(config.output, './index.vue'), fragment)
  },
}