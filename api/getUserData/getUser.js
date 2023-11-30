const { model } = require("mongoose");
const userCollection = require("../../lib/userModel");


const User= async (req, res,getUserEmail)=>{


    
        console.log(getUserEmail)
    
        const query = { email: getUserEmail }
    
        const result = await userCollection.find(query);
    
        res.send(result);
    
    
    
}
module.exports = User