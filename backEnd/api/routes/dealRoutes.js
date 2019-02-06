const express = require('express')
const router = express.Router()

const deal = require('../../controllers/dealsController')

// deal Routes
router.route('/')
// Methode get All Deal
  .get(deal.listDeals)
  .post(deal.createDeal)
  .put(deal.deleteAllDeal)

router.route('/:id')
  .get(deal.getDeal)
  .put(deal.updateDeal)
  .delete(deal.deleteDeal)

module.exports = router
