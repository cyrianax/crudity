const makeElementFragment = require('./element')

const makeFilterFragment = filter => {
  return filter
    ? `
      <!-- 条件查询 -->
      <div class="g-table-filter">
        ${
          filter.items.map(({ label, model, options, type = 'select' }) => {
            return `
              <div class="g-table-filter-item">
                <span>${label}</span>
                ${makeElementFragment(type, { label, model, options })}
              </div>
            `
          }).join('\n')
        }
        ${makeElementFragment('button', { name: '查询', clickHandler: 'onQuery' })}
      </div>
    `
    : '' 
}

const makeToolbarFragment = toolbar => {
  const btnMapping = {
    '新增': {
      name: '新增',
      clickHandler: 'onCreate',
    },
    '删除': {
      name: '删除',
      clickHandler: 'onDeleteSelected',
    }
  }
  return toolbar
    ? `
      <!-- 工具栏 -->
      <div class="g-table-toolbar">
        ${
          toolbar.btns.map(group => {
            return makeElementFragment('buttonGroup', {}, {
              default: group.map(btn => {
                const buttonOptions = typeof btn === 'string' ? btnMapping[btn] : btn
                return makeElementFragment('button', buttonOptions)
              }).join('\n')
            })
          }).join('\n')
        }
      </div>
    `
    : '' 
}

const makeTableFragment = table => {
  return table
    ? `
      <!-- 表格 -->
      <div class="g-table-grid">
        ${makeElementFragment('table', table)}
      </div>
    `
    : ''
}

const makePageFragment = page => {
  return page
    ? `
      <!-- 翻页 -->
      <div class="g-table-page">
        ${makeElementFragment('page')}
      </div>
    `
    : '' 
}

module.exports = ({ filter, toolbar, table, page }) => {
  const filterFragment = makeFilterFragment(filter)
  const toolbarFragment = makeToolbarFragment(toolbar)
  const tableFragment = makeTableFragment(table)
  const pageFragment = makePageFragment(page)

  return [
    filterFragment,
    toolbarFragment,
    tableFragment,
    pageFragment
  ].filter(fragment => fragment).join('\n')
}
