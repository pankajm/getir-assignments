const express = require('express');
const { Record } = require('../models/records');
const router = express.Router();
// const { httpCodes } = require('../constants');
// const { logger } = require('../startup/logging');

/** Get API for fetching counts data */
router.post('/getCounts', async (req, res, next) => {

  Record.aggregate([
    {
      $project: {
        key:1, 
        value:1, 
        createdAt:1,
        totalCount:{$sum:"$counts"}
      }
    }, {
       $match: {
        totalCount: {$gte: req.body.minCount, $lt: req.body.maxCount},
        createdAt: {$gte: new Date(req.body.startDate), $lte: new Date(req.body.endDate)}
      }
    }
  ])
  .then((result) => {
      return res.status(200).send(result);
    })
  .catch(error => res.send(error.message))
})

module.exports = router;