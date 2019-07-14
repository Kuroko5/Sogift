console.log('Param environnement = >>>>> ', process.env.NODE_ENV)

module.exports = {
  secret: 'Sogift',
  database: 'mongodb://admin:admin@ds149914.mlab.com:49914/sogift',
  sso: {
    host_be: process.env.HOST,
    callbackUrl: '/api/assert',
    protocol: 'https'
  }
}
