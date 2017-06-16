var db = require("../models");
var Trail = db.Trail;
var config = require('../config.js');
var admin = require('../config/administrators.json');

// GET /api/trails
function index(req, res) {
  // send back all our trails as JSON objects
  Trail.find({}, function(err, allTrails) {
    res.json(allTrails);
  });
}

 function show(req, res) {
  // find one place by its id
  console.log('places show', req.params);
  Trail.findById(req.params.id, function(err, trail){
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(trail);
  });
}

//   PUT/UPDATE:
function update(req, res) {
  var trail = Trail.findById(req.params.id, function(err, trail) {
    if (err) {
      console.log('error, trail not found');
    }
    // creating an object "trail" which will capture any form-data given OR hold onto
    // the trail's existing information for that field
    trail.name = req.body.name || trail.name;
    trail.distance = req.body.distance || trail.distance;
    trail.difficulty = req.body.difficulty || trail.difficulty;
    trail.image = req.body.image || trail.image;
    trail.link = req.body.link || trail.link;
    trail.trailMap = req.body.trailMap || trail.trailMap;
    // saving the trail object with updated fields & responding with json data object
    trail.save(function(err, savedTrail) {
      res.json(savedTrail)
    });
  });
};

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

function destroy(req, res) {
  console.log("trail_id:",req.params.id);
  var trailID = req.params.id;
  Trail.findByIdAndRemove({"_id": trailID}, function(err, trail) {
    if (err) {
      console.log("delete errror");
    }
    var accountSid = config.accountSid;
    var authToken = config.authToken;
    var sendingNumber = config.sendingNumber;

    //require the Twilio module and create a REST client
    var client = require('twilio')(accountSid, authToken);

    client.messages.create({
        to: admin[0].phoneNumber,
        from: sendingNumber,
        body: "A trail with id:"+ trailID +" got deleted",
    }, function(err, message) {
        console.log(message.sid);
    });
    console.log("deleted trail successfully");
    res.json(trail);
  })
}
module.exports = {
  index: index,
 create: create,
   show: show,
 destroy: destroy,
 update: update
};
