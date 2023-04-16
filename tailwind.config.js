module.exports = {
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      primary: '#212121',
      bg: '#111111'
    }),
    textColor: {
      primary: '#777777'
    },
    borderColor: {
      bg: '#111111'
    },
    divideColor: {
      primary: '#303030'
    }
  }
}
