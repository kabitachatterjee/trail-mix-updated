var db = require("../models");
var Trail = db.Trail;

// GET /api/trails
function index(req, res) {
  // send back all our trails as JSON objects
  Trail.find({}, function(err, allTrails) {
    //console.log(allTrails);
    res.json(allTrails);
  });
}

function update(req, res) {
  console.log(req.body.name);
  console.log("reached trailController.js req.params.id = ", req.params.id, "req.body = ", req.body);
  var updateId = req.params.id;
  console.log(updateId);
  Trail.findOneAndUpdate({"_id":updateId}, req.body, {new: true})

    .then(function(err, trail){

      if (err) {
        console.log("error updating trail", err)
      }
      //console.log(trail);
      res.json(trail);
    });
}


module.exports = {
  index: index,
  // create: create,
  // show: show,
  // destroy: destroy,
  update: update
};
