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
    default:"http://www.mommyhoodcentral.com/wp-content/uploads/2016/09/hiking-trails.jpg"
  },
  trailMap: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Trail = mongoose.model("Trail", TrailSchema);
module.exports = Trail;
