var db = require("./models");
var Trail = db.Trail;

var trailList = [
                {
                name: "Lobos Creek Valley Trail",
                distance: 0.8,
                difficulty: 2,
                link: "http://www.presidio.gov/trails/lobos-creek-valley-trail",
                image: "http://www.tapeciarnia.pl/tapety/normalne/210989_lato_las_potok_drozka.jpg",
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
                  name: "Golden Gate Park Trail",
                  distance: 6.1,
                  difficulty: 2,
                  link: "http://www.parksconservancy.org/visit/trails/?referrer=https://www.google.com/",
                  image: "http://www.lifefoc.com/photos/server3/golden_gate_park_0.jpg",
                  trailMap: "http://cdn.thebolditalic.com/paperclip/html_images/33283/images/original/ggpark-hires-notext.png?1396980951",
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
                  trailMap: "http://2.bp.blogspot.com/-eGZbA2s0O8o/U50KjB_a0KI/AAAAAAAAKdA/jMYzGUkuxTc/s1600/mt-sutro1.png",
                },
                {
                  name: "Lover's Lane Trail",
                  distance: 0.6,
                  difficulty: 1,
                  link: "http://www.presidio.gov/trails/lovers-lane-trail",
                  image: "http://www.redwoodhikes.com/Home2.jpg",
                  trailMap: "http://www.mappery.com/maps/Presidio-Trail-and-Overlook-Map.png",
                },
                {
                  name: "Batteries to Bluff Trail",
                  distance: 0.7,
                  difficulty: 3.5,
                  link: "http://www.presidio.gov/trails/batteries-to-bluffs-trail",
                  image: "http://www.campbellgradinginc.com/sites/campbellgradinginc.com/files/upload/btb_overall_treve_pic.jpg",
                  trailMap: "http://www.mappery.com/maps/Presidio-Trail-and-Overlook-Map.png",
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
