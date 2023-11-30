const popularCamps = require('../../api/popularCamps/getPopularCamps')






const router = require('express').Router()



router.get("/popularCamps", popularCamps)

module.exports = router