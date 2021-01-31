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
    ]
  },
  toolbar: {
    btns: ['create', 'delete']
  },
  table: {
    api: '/m/lo',
    items: [
      { name: '标题', field: 'name' },
      { name: '优先级', field: 'name', template: true },
      { name: '迭代', field: 'name' },
      { name: '负责人', field: 'name' },
      { name: '计划开始时间', field: 'name' },
      { name: '计划结束时间', field: 'name' },
      { name: '状态', field: 'name', template: true },
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
