const { model } = require("mongoose");
const popularCampsCollection = require("../../lib/models");

// const campsCollection = model("camps",{})


const getCamps = async (req, res) => {
 
    const cursor = popularCampsCollection.find();
    const result = await cursor;
    console.log(result)
    res.send(result)

}
module.exports = getCamps

