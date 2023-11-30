const { model } = require("mongoose");
const popularCampsCollection = require("../../lib/models");

// const popularCampsCollection = model("camps",{})


const popularCamps = async (req, res) => {

            
    const query = { type: "popular" }

    const result = await popularCampsCollection.find(query);

    res.send(result);

}


module.exports = popularCamps

