'use strict'

const fs = require('fs')

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
  }
})
hook.enable()

fs.readFile(__filename, (err, data) => console.log(data.toString()))


