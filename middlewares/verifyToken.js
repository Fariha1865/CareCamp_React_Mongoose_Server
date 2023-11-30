
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    // const token = req?.cookies?.token;

    // console.log(req.headers)

    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Unauthorized Access' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized Access' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log("error token")
            return res.status(401).send({ message: 'Unauthorized Access' });
        }

        console.log("from verifyToken")
        req.decoded = decoded;
        next();

    })

}


module.exports = verifyToken