const mongoose = require('mongoose')
const xpath = require('xpath')
const jwt = require('jsonwebtoken') // used to create, sign, and verify tokens

const {Strategy} = require('passport-saml')
const {DOMParser} = require('xmldom')
const {genSaltSync, hashSync} = require('bcryptjs')

const USER = mongoose.model('Users')
const TOKEN = mongoose.model('Tokens')

const config = require('./config/config')

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  passport.store = (req, res, next) => {
    const referer = req.headers.referer
    console.log(referer)
    req.session.redirect = referer

    // console.log('REFERER STORED IN SESSION >>> ', res.session.redirect)

    next()
  }

  // TODO:  verifier le contenue de la redirection
  passport.redirect = (req, res, next) => {
    console.log('REQ SESSION LOGIN >>>>> ', req.session)
    console.log('PASSSSPORT >>>>> ', req.session.passport)
    const user = req.session.passport.user
    console.log('route: 124 ----------------->', user)

    const payload = {
      _id: user._id,
      role: user.role
    }

    const token = jwt.sign(payload, config.secret, {
      expiresIn: '13h',
      algorithm: 'HS256'
    })

    console.log('creation d\'un nouveau token')
    TOKEN.find({user_id: user._id})
      .populate('user_id')
      .exec()
      .then(t => {
        console.log('userfind ', t)
        if (t.length > 0) {
          console.log('the token of this user exist ')
          console.log('Delete Token')
          TOKEN.deleteOne({user_id: user._id}).exec()
            .then(result => {
              //console.log(result)
              console.log('le token a bien ete supprimer')

              console.log('creation d\'un nouveau token')
              let newToken = new TOKEN()
              newToken.user_id = user._id
              newToken.token = token

              console.log(newToken)
              newToken.save()
              console.log('user created')
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          console.log('the token of this user doesn\'t exist')
          let newToken = new TOKEN()
          newToken.user_id = user._id
          newToken.token = token
          console.log(newToken.save())

          newToken.save()
          console.log('user created')
        }
      })
      .catch(e => {
        console.log(e)
      })

    const redirect = config.sso.host_fe +`/login?token=${token}`
    console.log('redirect after login ' , redirect)
    res.redirect(redirect)
  }

  passport.parser = function (req, res, next) {
    const saml_response = req.body.SAMLResponse
    console.log()
    try {
      const xmlData = new Buffer(saml_response, 'base64').toString('utf8')
      const doc = new DOMParser().parseFromString(xmlData)
      const signedInfos = xpath.select('//*[local-name()="SignedInfo"]', doc)
      const assertions = xpath.select('//*[local-name()="Assertion"]', doc)

      assertions.forEach(a => {
        a.setAttribute('xmlns:saml', 'urn:oasis:names:tc:SAML:2.0:assertion')
        a.setAttribute('xmlns:xs', 'http://www.w3.org/2001/XMLSchema')
        a.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
      })

      signedInfos.forEach(s => {
        s.setAttribute('xmlns:ds', 'http://www.w3.org/2000/09/xmldsig#')
      })

      req.body.SAMLResponse = new Buffer(doc.toString(), 'utf8')
    } catch (e) {
      console.error(e)
    }

    console.log('Done retrieving saml auth informations')

    next()
  }
  passport.use(
    new Strategy({
      path: config.sso.callbackUrl,
      identifierFormat: config.sso.identifierFormat,
      entryPoint: config.sso.entryPoint,
      issuer: config.sso.issuer,
      cert: config.sso.cert
      //, logoutUrl: config.sso.logoutUrl,
    }, ({emailaddress, lastName, firstName, uid}, done) => {
      console.log(uid)

      USER.findOne({
        $or: [
          {matricule: uid},
          {email: emailaddress}
        ]
      })
        .exec()
        .then(response => {
          console.log(77, response)
          if (response === null) {
            let newUser = new USER()
            console.log('creation de l\'utilisateur')

            console.log('initialisation de l user', newUser)
            newUser.matricule = uid
            console.log('son matricule :', newUser.matricule)

            newUser.firstname = firstName
            newUser.lastname = lastName
            newUser.name = firstName + '.' + lastName
            console.log('full name ', newUser.name)

            newUser.email = emailaddress
            console.log('tttttttttttt')

            //TODO: update model for delete password and ?username
            newUser.username = firstName + '.' + lastName
            newUser.password = hashSync(firstName + '.' + lastName, genSaltSync(10))

            // console.log(newUser)
            return newUser.save()
          } else {
            console.log('Already existing, need to return his token :)')
            return response
          }
        })
        .then(user => {
          console.log(105, user)
          done(null, user)

        })
        .catch(err => {
          console.error(err)

          done(err, null)
        })

    })
  )

}
