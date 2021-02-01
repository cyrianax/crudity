const prettier = require('prettier')

module.exports = {
  getOptions: config => {
    const filterOptions = config.filter.items.filter(item => item.options).map(item => item.options)
    const formOptions = config.panels.reduce((list, panel) => {
      const news = panel.form.items.filter(item => item.options).map(item => item.options)
      return list.concat(news)
    }, [])
    return [].concat(filterOptions, formOptions)
  },
  capitalize: str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },
  trim: str => {
    return str.replace(/^[\r\n]+/g, '').replace(/[\r\n]+$/g, '')
  },
  beautify: (str, parser = 'babel') => prettier.format(str, {
    semi: false,
    singleQuote: true, 
    parser
  })
}
