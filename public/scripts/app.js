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
    $("img").on("click", function openInfo() {
      var rawInfoTemplate = $("#info-modal-template").html();
      var infoId = $(this).attr("data-target");
      var currentInfo = jsonData.filter(function(obj) {
        return obj._id === infoId;
      });

      var stampedInfoTemplate = Mustache.render(rawInfoTemplate, currentInfo[0]);
      console.log(stampedInfoTemplate);
      $("#modal-target").html(stampedInfoTemplate);
      $("#modal-target").show();
      $(".modal").show();
      $("button").on("click", function(e) {
        $(".modal").hide();
      });
    });
  } // close of indexAllTrails

  function allTrailsError() {
    console.log("error: failed to load index of all trails");
  }




}); //close of $(document).ready
