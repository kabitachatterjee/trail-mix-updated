console.log("JS is linked");

$(document).ready(function(){

  $.ajax({
    method: "GET",
    url: "/api/trails",
    success: indexAllTrails,
    error: allTrailsError
  });

  function indexAllTrails(jsonData) {
    var rawTemplate = $("#trails-template").html();
    jsonData.forEach(function(el) {
      var stampedTemplate = Mustache.render(rawTemplate, el);
      $("#trails").append(stampedTemplate);
    });
  }

  function allTrailsError() {
    console.log("error: failed to load index of all trails");
  }


}); //close of $(document).ready
