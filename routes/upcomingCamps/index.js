const { getUpcomingCamps, upcomingDetails } = require('../../api/upcomingCamps')









const router = require('express').Router()



router.get("/upcomingCamps",getUpcomingCamps)
// router.get("/upcomingDetails/:id",(req, res) => {upcomingDetails(req, res,req?.params.email)})

module.exports = router