
const User = require('../../api/getUserData/getUser')

const router = require('express').Router()


router.get("/user/:email",(req, res) => {User(req, res,req?.params.email)});

module.exports = router