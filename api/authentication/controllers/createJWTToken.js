require('dotenv').config();
const jwt = require('jsonwebtoken');
const generateToken = require('../../../utils/generateToken');


const jwtToken = async (req, res) => {

    const user = req.body;
    console.log("logging In" + JSON.stringify(user));


    const token = generateToken(user)


    res.send(token);

}

module.exports = jwtToken