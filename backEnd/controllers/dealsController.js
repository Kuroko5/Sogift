// DealsController.js
const DealDomain = require('../domain/deals')

// RETURNS ALL THE USERS IN THE DATABASE
exports.listDeals = function (req, res) {
  DealDomain.all().then(deals => res.status(200).json(deals)).catch(err => res.status(500).send(err));
}

// CREATES A NEW USER
exports.createDeal = function (req, res) {
  DealDomain.create(req.body).then(deal => res.status(200).json(deal)).catch(err => {
    res.status(500).send(err)
    console.log(err)
  })
}

exports.getDeal = function (req, res) {
  DealDomain.one(req.params.id).then(deal => res.status(200).json(deal)).catch(err => res.status(500).send(err))
}

// UPdate deal by ID
exports.updateDeal = function (req, res) {
  DealDomain.update(req.params.id, req.body).then(deal => res.status(200).json(deal)).catch(err => res.status(500).send(err));
}

// Delete by iD
exports.deleteDeal = function (req, res) {
  DealDomain.delete(req.params.id).then(deal => res.status(200).json(deal)).catch(err => res.status(500).send(err));
}

// Delete by iD
exports.deleteAllDeal = function (req, res) {
  DealDomain.deleteAll(req.body).then(deal => res.status(200).json(deal)).catch(err => res.status(500).send(err))
}
