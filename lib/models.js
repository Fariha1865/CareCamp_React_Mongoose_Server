const { model } = require("mongoose");
const popularCampsCollection = model("camps",{},{ versionKey: false })

module.exports = popularCampsCollection