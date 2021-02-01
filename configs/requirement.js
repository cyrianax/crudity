module.exports = {
  output: './development/Requirement',
  filter: {
    items: [
      { 
        label: '迭代', 
        model: 'iretion', 
        options: { 
          model: 'sex' 
        } 
      },
      { 
        label: '迭代b', 
        model: 'iretiaaaon', 
        options: { 
          model: 'sefffx' 
        } 
      },
    ]
  },
  toolbar: {
    btns: [['新增', '删除']]
  },
  table: {
    api: '/m/lo',
    items: [
      { label: '标题', field: 'name', width: '200px' },
      { label: '优先级', field: 'name', template: true },
      { label: '迭代', field: 'name' },
      { label: '负责人', field: 'name' },
      { label: '计划开始时间', field: 'name' },
      { label: '计划结束时间', field: 'name' },
      { label: '状态', field: 'name', template: true },
    ],
    control: ['edit', 'delete'],
    index: true,
    select: true 
  },
  page: true,
  panels: [
    {
      name: 'create',
      form: {
        api: '/m/l',
        items: [
          {
            label: '迭代', 
            model: 'iretion',
            options: {
              model: 'dep',
              api: '/api/m/login',
            }
          }
        ]
      }
    }
  ],
}
