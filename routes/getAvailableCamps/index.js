const getCamps = require('../../api/getCamps/getCamps')


const router = require('express').Router()

router.get("/camps", getCamps )

module.exports = router