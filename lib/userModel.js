const { model } = require("mongoose");
const userCollection = model("users",{},{ versionKey: false })

module.exports = userCollection