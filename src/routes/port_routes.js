var routes = []

routes['auth'] = {
    id: 0,
    name: 'auth',
    port: process.env.AUTHPORT || 3001
};

module.exports = routes;