const config = require('./config');
const app = require('./app');
const log = console.log;

const env = config.server.env;
const port = config.server.port;
const portprod = config.server.portprod;

if (env === 'dev') {
    app.listen(port,function(){
        log(`[tec-server] listening on port ${port}, in mode ${env}`);
    });
} else {
    app.listen(portprod,function(){
        log(`[tec-server] listening on port ${port}, in mode ${env}`);
    });
}