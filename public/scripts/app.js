console.log("JS is linked");

$(document).ready(function(){

  $.ajax({
    method: "GET",
    url: "/api/trails",
    success: indexAllTrails,
    error: allTrailsError
  });

  function indexAllTrails(jsonData) {
    console.log(jsonData);
  }

  function allTrailsError() {
    console.log("error: failed to load index of all trails");
  }


}); //close of $(document).ready
