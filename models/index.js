var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/trail-mix");

//require & export the trails model through index.js
module.exports.Trail = require("./trail.js");
module.exports.User = require("./user.js");
