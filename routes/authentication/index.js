const { logOut, createJWTToken } = require('../../api/authentication/controllers')


const router = require('express').Router()


router.post("/jwt", createJWTToken)

router.post("/logout", logOut)


module.exports = router