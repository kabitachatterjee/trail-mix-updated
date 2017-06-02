var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/trail-mix");

module.exports.Trail = require("./trail.js");
