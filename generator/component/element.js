const { trim } = require("../utils")

const element = {
  select: ({ label, model, options }) => {
    return `
      <el-select v-model="${model}" placeholder="${'请选择' + label}" clearable>
        <el-option v-for="item in options.${options.model}" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    `
  },
  buttonGroup: (config, slot) => {
    return `
      <el-button-group>
        ${slot.default}
      </el-button-group>
    `
  },
  button: ({ name, clickHandler }) => {
    const click = clickHandler ? `@click="${clickHandler}"` : ''
    return `<el-button ${click}>${name}</el-button>`
  },
  table: ({ items }) => {
    return `
      <el-table>
        ${items.map(item => {
          const prop = item.template
            ? ''
            : `prop=${item.field}`

          const width = item.width
            ? `width=${item.width}`
            : ''

          const custom = item.template
            ? `
              <template #default="scope">
                {{scope.row.${item.field}}}
              </template>
            `
            : ''
          return `<el-table-column label=${item.label} ${prop} ${width}>${custom}</el-table-column>`
        }).join('\n')}
      </el-table> 
    `
  },
  page: () => {
    return `
      <el-pagination :current-page="table.page.currentPage" :page-size="table.page.pageSize" :total="table.page.total" layout="total, sizes, prev, pager, next, jumper" @size-change="table.onSizeChange" @current-change="table.onCurrentChange"></el-pagination>
    `
  },
}

module.exports = (name, config, slot) => {
  return trim(element[name](config, slot))
}