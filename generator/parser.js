const config = {
  items: [
    { 
      label: '', 
      model: '',
      options: {
        model: '',
        api: '',
        items: []
      }
    }
  ]
}

const component = {
  select: ({ label, model, options }) => {
    return `
      <div class="">
        <span>${label}</span>
        <el-select v-model="${model}" placeholder="${'请选择' + label}" clearable>
          <el-option
            v-for="item in options.${options.model}"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>    
    `
  },
  input: ({ label, model }) => {
    return `
      <div class="">
        <span>${label}</span>
        <el-input v-model="${model}" placeholder="请输入内容"></el-input>
      </div>    
    `
  },
  toolbar: () => {
    return `
      <div>
        
      </div>
    `
  },
  table: ({ items }) => {
    return `
      <el-table>
        ${items.map(item => {
          return `
            <el-table-column prop=${item.field}>

            </el-table-column>
          `
        })}
      </el-table>  
    `
  }
}
  