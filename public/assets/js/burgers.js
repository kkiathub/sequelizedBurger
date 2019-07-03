// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".btn-devour").on("click", function (event) {
    var id = $(this).data("id");

    var devourState = {
      devoured: true
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devourState
    }).then(
      function () {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("get here!");
    var newBurger = {
      name: $("#burger-id").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("Added new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
