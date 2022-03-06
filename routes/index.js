const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();
const { Record } = require('../models/records');
const { responseStatusMapping } = require('../constants');
const { logger } = require('../startup/logging');
const { validate } = require('../utils/validation')

/** Get API for fetching records matching provided conditions */
router.post('/getRecords', async (req, res, next) => {

  /**
   * Validate Reqeuest 
   */
  const validationSchema = {
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    minCount: Joi.number().required(),
    maxCount: Joi.number().required()
  }
  const validationResult = validate(req.body, validationSchema);
  if(validationResult.error)
    return res.status(400).send({
        code:responseStatusMapping.failure.code,
        msg:responseStatusMapping.failure.msg,
        error:`Bad Request : ${validationResult.error.message}`
      });

  /**
   * Fetch records from Database using aggregation 
   */

  Record.aggregate([
    {
      $project: {
        _id:0,
        key:1, 
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
      const responseObj = {
        code:responseStatusMapping.success.code,
        msg:responseStatusMapping.success.msg,
        records:[...result]
      }
      return res.status(200).send(responseObj);
    })
  .catch(err => {
    logger.error(err.message, err);
    const errorObj = {
      code:responseStatusMapping.failure.code,
      msg:responseStatusMapping.failure.msg,
      error:err.message
    }
    res.status(500).send(errorObj)
  })
})

module.exports = router;