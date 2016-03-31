module.exports = {
  root: true,
  extends: 'standard',
  plugins: [
    'vue'
  ],
  'rules': {
    'arrow-parens': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
