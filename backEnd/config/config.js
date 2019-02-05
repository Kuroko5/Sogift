const fs = require('fs')
const path = require('path')

console.log('environnement ' ,process.env)

console.log('Param environnement = >>>>> ',process.env.NODE_ENV )
// let entryPoint=''
// let hostFE=''

//   console.log('ce n\'est pas la version demo')
//   hostFE='https://tekhe-fe-for-watson.mybluemix.net'
//   process.env.HOST = "https://tekhne-be-for-watson.eu-gb.mybluemix.net"
//   entryPoint='https://w3id.alpha.sso.ibm.com/auth/sps/samlidp/saml20/logininitial?RequestBinding=HTTPPost&PartnerId=Tekhne&NameIdFormat=email&Target='+process.env.HOST

// console.log('host front End ', hostFE)
// console.log('env host ' ,process.env.HOST)
// console.log('entryPoint ', entryPoint)


module.exports = {
  secret: 'Sogift',
  database: 'mongodb://admin:admin@ds149914.mlab.com:49914/sogift',
  sso: {
    // host_fe: hostFE,
    host_be: process.env.HOST,
    callbackUrl: '/api/assert',
    protocol: 'https'
    // identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:' + 'transient',
    // entryPoint: entryPoint,// + process.env.HOST,
    // issuer: issuerSAML,
    // cert: certificateSAML,
    // logoutUrl: 'https://w3id.alpha.sso.ibm.com/auth/sps/samlidp/saml20/slo\'',
  }
}

// TODO: mettre en place les variable d'environnement
/**
 * creer une nouvelle instance SAML
 * Declaré les NODE_ENv dans les environnement deployer
 * faire les condition recuperant les node env
 *
 */




/*
process.env.NODE_ENV = production, development, demo, testing

if (process.env.NODE_ENV === 'production'){
loadtelconf
process.env.HOST = "https://tekhne-be-for-watson.eu-gb.mybluemix.net"
}*/
