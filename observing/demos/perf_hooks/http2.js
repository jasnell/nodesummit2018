'use strict'

const http2 = require('http2')

const { PerformanceObserver } = require('perf_hooks');

const obs = new PerformanceObserver((items) => {
  const entry = items.getEntries()[0];
  console.log(entry)
});
obs.observe({ entryTypes: ['http2'] });

const server = http2.createServer()
server.on('stream', (stream) => {
  stream.respond()
  stream.end('this did not take long')
})

server.listen(0, () => {

  const client = http2.connect(`http://localhost:${server.address().port}`)
  const req = client.request()
  req.setEncoding('utf8')
  req.on('data', console.log)
  req.on('end', () => {
    client.close()
    server.close()
  })

})
