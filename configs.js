const configs = [
  {
    path: '/development/Requirement',
    filter: {
      items: [
        { 
          label: '迭代', 
          model: 'iretion',
          options: {
            model: '',
            api: '',
            items: []
          }
        }
      ]
    },
    toolbar: {
      btns: [
        '创建'
      ]
    },
    table: {
      items: [
        { name: '标题', field: 'name' },
        { name: '优先级', field: 'name', template: true },
        { name: '迭代', field: 'name' },
        { name: '负责人', field: 'name' },
        { name: '计划开始时间', field: 'name' },
        { name: '计划结束时间', field: 'name' },
        { name: '状态', field: 'name', template: true },
      ],
      control: [
        { icon: '', }
      ] 
    },
    page: true,
    forms: [
      {
        name: 'create',
        items: [
          {
            label: '迭代', 
            model: 'iretion',
            options: {
              model: '',
              api: '',
              items: []
            }
          }
        ]
      }
    ]
  }
]

const getOps = config => {
  const op1 = config.filter.items.filter(item => item.options).map(item => item.options)
  const op2 = config.forms.reduce((form, list) => {
    const news = form.items.filter(item => item.options).map(item => item.options)
    return list.concat(news)
  }, [])
  const op = [].concat(op1, op2)
  return op
}

const ge = ops => {
  const importStr = `
    import { reactive } from 'vue'
  `

  const str= `
    
  `
}
