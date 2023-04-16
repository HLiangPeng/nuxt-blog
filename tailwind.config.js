module.exports = {
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      primary: '#212121',
      dark: '#111111'
    }),
    textColor: {
      primary: '#777777'
    }
  }
}
