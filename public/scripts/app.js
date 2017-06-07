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

//add / create form event handler
  $('#addForm').on('submit', function(e) {
    var name = $('#name');
    // Check if there is an entered value
        if(!name.val()) {
          // Add errors highlight
          name.closest('.form-group').removeClass('has-success').addClass('has-error');
          return false; // Stop submission of the form
        }
        else {
          // Remove the errors highlight
          name.closest('.form-group').removeClass('has-error').addClass('has-success');
        }
       e.preventDefault();
       $.ajax({
        method: 'POST',
        url: '/api/trails/',
        data: $(this).serialize(),
        success: addTrailSuccess,
        error: addTrailError
       });
      $("#addModal").hide();
    });

  $(".add").on("click", function openAddModal() {
    $("#addModal").show();
    $(".close").on("click", function(e) {
       $(".modal").hide();
     });
   });

  // open update modal when update button is clicked
  $trailsList.on("click", ".update-btn", function openUpdateModal() {
    var updateId = $(this).attr("data-id");
    console.log(`clicked update button for /api/trails/${updateId}`);
    var updateModal = $("#update-modal");
    $("#update-modal-target").html(updateModal);
    $("#update-modal-target").show();
    updateModal.show();
    $(".close").on("click", function(e) {
      e.preventDefault();
      updateModal.hide();
      $("#updateForm").trigger('reset');
    })
    $(".submit").on("click", function(e) {
      var updateData = $("#updateForm").serialize();
      e.preventDefault();
        $.ajax({
          method: 'PUT',
          url: `/api/trails/${updateId}`,
          data: updateData,
          success: updateTrailSuccess,
          error: updateTrailError
        });
      $("#updateForm").trigger('reset');
      updateModal.hide();
    });
  });

  // open delete modal when delete button is clicked
  $trailsList.on("click", ".delete-btn", function openDeleteModal() {
    var deleteId = $(this).attr("data-id");
    console.log(`clicked delete button for /api/trails/${deleteId}`);
    var deleteModal = $("#delete-modal");
    $("#delete-modal-target").html(deleteModal);
    deleteModal.show();
    $("#confirmDelete").on("click", function(e) {
        $.ajax({
          method: 'DELETE',
          url: `/api/trails/${deleteId}`,
          success: deleteTrailSuccess,
          error: deleteTrailError
        });
      $("#delete-modal").modal("hide");
    });
  });

  function indexAllTrails(jsonData) {
    allTrails = jsonData;
    var rawTemplate = $("#trails-template").html();
    jsonData.forEach(function(el) {
      var stampedTemplate = Mustache.render(rawTemplate, el);
      $("#trails").append(stampedTemplate);
    });
    $(".card object").on("click", function openInfo() {
      var rawInfoTemplate = $("#info-modal-template").html();
      var infoId = $(this).attr("data-target");
      var currentInfo = jsonData.filter(function(obj) {
        return obj._id === infoId;
      });
      var stampedInfoTemplate = Mustache.render(rawInfoTemplate, currentInfo[0]);
      $("#modal-target").html(stampedInfoTemplate);
      $("#modal-target").show();
      $(".info-modal").show();
      $("#addModal").hide();
      $("button").on("click", function(e) {
        $(".modal").hide();
      });
    });
  } // close of indexAllTrails


//  SEARCH FUNCTION
  $('.search').on('submit', function(e) {
    e.preventDefault();
    var search = $('.search input').val();
    console.log(search);
    searchTrailSuccess(search);
  });


  function allTrailsError() {
    console.log("error: failed to load index of all trails");
  }

  function addTrailSuccess(jsonData) {
    allTrails.push(jsonData);
    console.log(allTrails);
    $("#trails").empty();
    indexAllTrails(allTrails);
  }

  function addTrailError() {
    console.log("create error");
  }


  function updateTrailSuccess(jsonData) {
    var updatedTrail = jsonData;
    console.log(jsonData);
    var updatedTrailId = updatedTrail._id;

    allTrails = allTrails.map(function(t, i) {
      if (t._id === updatedTrailId) {
        t.name = updatedTrail.name;
        t.distance = updatedTrail.distance;
        t.difficulty = updatedTrail.difficulty;
        t.image = updatedTrail.image;
        t.trailMap = updatedTrail.trailMap;
        t.link = updatedTrail.link;
      }
      return t;
    });
    $("#trails").empty();
    indexAllTrails(allTrails);
    console.log("successfully updated", updatedTrailId)
  }

  function updateTrailError() {
    console.log("Error: hit updateTrailError function!")
  }

  function deleteTrailSuccess(jsonData) {
    var trail = jsonData;
    var trailId = trail._id;

    allTrails = allTrails.filter(function(t) {
      return (t._id !== trailId);
    });

    $("#trails").empty();
    indexAllTrails(allTrails);
    console.log("deleted successfully");
  } // end of deleteTrailSuccess

  function deleteTrailError() {
    console.log("error on delete");
  }

  function searchTrailSuccess(search) {
    var unfilteredTrails = allTrails;

    allTrails = allTrails.filter(function(t,i) {
      var trail = t.name.toLowerCase();
      return trail.includes(search.toLowerCase());
    });

    if (search !== "") {
      $(".add").hide();
    }
    $("#trails").empty();
    if (allTrails.length === 0) {
      $("#trails").append("<h3>Your search did not return any results.</h3>");
    } else {
      indexAllTrails(allTrails);
    }
    allTrails = unfilteredTrails;
  };

}); //close of $(document).ready
