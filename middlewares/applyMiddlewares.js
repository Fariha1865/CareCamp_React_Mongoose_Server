const express = require('express');
const cors = require('cors');
const { LOCAL_CLIENT, CLIENT } = require('../config/default');

const applyMiddleware = (app) =>{
    const corsOptions = {
        origin: [

            LOCAL_CLIENT,
            CLIENT,
            "https://api.imgbb.com",
            
    
        ],
        credentials: true,
        optionSuccessStatus: 200,
    
    }
    
    app.use(cors(corsOptions));
    
    app.use(express.json());
}

module.exports = applyMiddleware