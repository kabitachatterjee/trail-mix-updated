var db = require("../models");
var Trail = db.Trail;

// GET /api/trails
function index(req, res) {
  // send back all our trails as JSON objects
  Trail.find({}, function(err, allTrails) {
    res.json(allTrails);
  });
}

function create(req, res) {

   var newTrail = new Trail(req.body);
  newTrail.save(function(err,trail){
    if(err){
      console.log("post error: " + err);
      res.sendStatus(500);
    }
  console.log("Success");
  res.json(newTrail);
});

}
module.exports = {
  index: index,
 create: create
  // show: show,
  // destroy: destroy,
  // update: update
};
