var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TrailSchema = new Schema({
  name: String,
  distance: Number,
  difficulty: {
    type: Number,
    minimum: 1,
    maximum: 5
  },
  link: String,
  image: {
    type: String,
    default:"http://goldenhillsrealestate.com/files/2010/11/Stevens-trail-sign-2.jpg"
  },
  trailMap: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Trail = mongoose.model("Trail", TrailSchema);
module.exports = Trail;
