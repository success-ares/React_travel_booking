const { port, env } = require('./config/vars')
const server = require('./config/express')

// listen to requests
server.listen(port, () => console.info(`server started on port ${port} (${env || 'development'})`))

/**
* Exports express
* @public
*/
module.exports = server
