var db = require("./models");
var Trail = db.Trail;

var trailList = [
                {
                  name: "Batteries to Bluff Trail",
                  distance: 0.7,
                  difficulty: 3.5,
                  link: "http://www.presidio.gov/trails/batteries-to-bluffs-trail",
                  image: "http://www.campbellgradinginc.com/sites/campbellgradinginc.com/files/upload/btb_overall_treve_pic.jpg",
                  trailMap: "http://www.mappery.com/maps/Presidio-Trail-and-Overlook-Map.png",
                },
                {
                  name: "California Costal Trail",
                  distance: 2.4,
                  difficulty: 2,
                  link: "http://www.presidio.gov/trails/california-coastal-trail",
                  image: "http://3cjlxe2q722oycgf1okjyxcf.wpengine.netdna-cdn.com/wp-content/uploads/2010/12/landsendlabyrinth.jpg",
                  trailMap: "http://www.mappery.com/maps/Presidio-Trail-and-Overlook-Map.png",
                },
                {
                  name: "Park Trail",
                  distance: 1.7,
                  difficulty: 2,
                  link: "http://www.presidio.gov/trails/park-trail",
                  image: "http://68.media.tumblr.com/f94c2754c39029eea35a319c6575ea40/tumblr_inline_nwnl3bWlXO1qfmiuj_500.jpg",
                  trailMap: "http://www.mappery.com/maps/Presidio-Trail-and-Overlook-Map.png",
                },
                {
                  name: "Mount Sutro Loop",
                  distance: 2.0,
                  difficulty: 2.5,
                  link: "https://www.alltrails.com/trail/us/california/mount-sutro-loop",
                  image: "https://blogdotemilypolardotcom.files.wordpress.com/2012/05/sutro_120512-14711.jpg",
                  trailMap: "http://www.peasepress.com/sutromap.pdf",
                }
];

Trail.remove({}, function(err, trails) {

  Trail.create(trailList, function(err, trail) {
    if (err) {
      return console.log("error: ", err);
    }
    console.log("created new trails list");
    process.exit();
  });
});
