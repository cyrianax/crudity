const { getOptions, capitalize, beautify } = require('../utils')

const makeImportFragment = config => {
  const options = getOptions(config)
  const optionsImportSegment = options.length 
    ? `import useOptions from './use.options.js'` 
    : ''

  const tableImportSegment = config.table 
    ? `import useTable from './use.table.js'`
    : ''
    
  const panelImportSegments = config.panels
    ? config.panels.map(panel => {
      return `import use${capitalize(panel.name)}Panel from './use.panel.${panel.name}.js'`
    })
    : []

  return [
    optionsImportSegment,
    tableImportSegment,
    ...panelImportSegments,
  ].join('\n')
}

const makeUseFragment = config => {
  const options = getOptions(config)
  const optionsUseSegment = options.length 
    ? `const options = useOptions()` 
    : ''

  const tableUseSegment = config.table 
    ? `const table = useTable()`
    : ''

  const panelUseSegments = config.panels
    ? config.panels.map(panel => {
      return `
        const ${panel.name}Panel = use${capitalize(panel.name)}Panel({
          success: () => {
            table.onQuery
          }
        })
      `
    })
    : []

  return [
    optionsUseSegment,
    tableUseSegment,
    ...panelUseSegments,
  ].join('\n')
}

module.exports = config => {
  const importFragment = makeImportFragment(config)
  const useFragment = makeUseFragment(config)

  return beautify([
    importFragment,
    '\t',
    useFragment,
  ].filter(fragment => fragment).join('\n'))
}