const { createHook } = require('async_hooks')
const hook = createHook({
  init(id, type, trigger, resource) {
    process._rawDebug(`${type} #${id} created`)
  },

  before(id) {
    process._rawDebug(`${id} triggering callback`)
  },

  after(id) {
    process._rawDebug(`${id} triggered callback`)
  },

  destroy(id) {
    process._rawDebug(`${id} destroyed`)
  },

  promiseResolve(id) {
    process._rawDebug(`PROMISE #${id} resolved`)
  }
})
hook.enable()

async function bar() {
  return 'baz'
}

async function foo() {
  return await bar()
}

foo().then(console.log)