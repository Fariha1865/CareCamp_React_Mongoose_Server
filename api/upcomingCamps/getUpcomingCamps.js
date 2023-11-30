const { model } = require("mongoose");
const upcomingCampsCollection = require("../../lib/upcomingCampsModel");




const getUpcomingCamps = async (req, res) => {

            
    const cursor = upcomingCampsCollection.find();
    const result = await cursor;

    console.log("upcoming")
    console.log(result)
    res.send(result)

}
module.exports = getUpcomingCamps

