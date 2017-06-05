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
    allTrails = jsonData;
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
      $("#modal-target").html(stampedInfoTemplate);
      $("#modal-target").show();
      $(".modal").show();
      $("#addModal").hide();
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
    updateModal.show();
    $("#updateForm").on("click", ".submit", function(e) {
      var updateData = $("#updateForm").serialize();
      e.preventDefault();
        $.ajax({
          method: 'PUT',
          url: `/api/trails/${updateId}`,
          data: updateData,
          success: updateTrailSuccess,
          error: updateTrailError
        });
      $("#update-modal").hide();
    });
  });

  function updateTrailSuccess(jsonData) {
    console.log("Reached updateTrailSuccess function in app.js!!");

    var updatedTrail = jsonData;
    var updatedTrailId = updatedTrail._id;
    console.log(updatedTrail, updatedTrailId);
    allTrails = allTrails.map(function(t, i) {
      if (t._id === updatedTrailId) {
        t.name = updatedTrail.name;
        t.distance = updatedTrail.distance;
      }
    });
  }
  $(".add").on("click", function openAddModal() {
    $("#addModal").show();
    $('#addForm').on('submit', function(e) {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/api/trails/',
        data: $(this).serialize(),
        success: addPlaceSuccess,
        error: addPlaceError
      });
      $("#addModal").hide();
    });
    $("button").on("click", function(e) {
      $(".modal").hide();
    });
  });
function addPlaceSuccess() {
  console.log("yay!");
  console.log(allTrails.length);
    if(allTrails.length === allTrails.length + 1){
      indexAllTrails([allTrails[allTrails.length - 1]]);
      }
    }
function addPlaceError() {
  console.log("create error");
}

  function updateTrailError() {
    console.log("Error: hit updateTrailError function!")
  }

}); //close of $(document).ready
