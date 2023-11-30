const { model } = require("mongoose");
const upcomingCampsCollection = model("upcomingCamps",{},"upcomingCamps",{ versionKey: false })

module.exports = upcomingCampsCollection