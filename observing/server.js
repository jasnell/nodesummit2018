'use strict';

const { stat } = require('fs')
const http2 = require('http2')
const path = require('path')
const pino = require('pino')()
const { ephemeral } = require('tls-keygen')

async function init() {
  const options = await ephemeral({
    commonName: 'localhost',
    entrust: false
  })
  const server = http2.createSecureServer(await ephemeral())
  server.on('stream', (stream, headers) => {
    let p = headers[':path']
    if (p === '/' || p === '/index') {
      p = '/index.html'
    }
    const localPath = path.resolve(__dirname, `.${p}`)
    stat(localPath, (err, stat) => {
      if (err) {
        pino.error({ ':path': p, 'root': localPath }, '404')
        stream.respond({ ':status': 404 })
        stream.end('Not Found')
        return
      }
      pino.info({ ':path': p, 'root': localPath }, '200')
      stream.respondWithFile(localPath)
    })
  })
  
  server.listen(8888, () => {
    pino.info('HTTP/2 Server is listening on port 8888')
  })
}

init()