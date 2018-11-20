const restify = require('restify'),
  restifyPlugins = require('restify-plugins')
  corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
  })

/**
 * Initialize Server
 */
const server = restify.createServer({
    name    : 'Node-Tasks',
    url : 'http://localhost:3000',
});

server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());
server.pre(cors.preflight)
server.use(cors.actual)

server.listen(3000, () => {
    require('./routes')(server);
    console.log('%s listening at %s', server.name, server.url);
});