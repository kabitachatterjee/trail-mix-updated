console.log("JS is linked");
var $trailsList;
var allTrails = [];

$(document).ready(function(){

  $trailsList = $("#trails");

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

  // open update modal when update button is clicked
  $trailsList.on("click", ".update-btn", function openUpdateModal() {
    var updateId = $(this).attr("data-id");
    console.log(`clicked update button for /api/trails/${updateId}`);
    var updateModal = $("#update-modal");
    $("#update-modal-target").html(updateModal);
    $("#update-modal-target").show();
    $("#update-modal").show();
  });



}); //close of $(document).ready
