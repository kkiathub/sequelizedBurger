// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".btn-devour").on("click", function (event) {
    // Show the modal with the best match
    $("#customer-name").val("");
    var radioValue = $("input[name='rating']:checked").val();
    if (radioValue) {
      $("input[name='rating']:checked").prop("checked", false);
    }
    // pass burger id to devour-form
    $("#devour-form").attr("data-id", $(this).data("id"));

    $("#devour-modal").modal("toggle");

  });

  $("#devour-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("get here : devour");
    var id = $(this).data("id");
    var radioValue = $("input[name='rating']:checked").val();

    var devourState = {
      devoured: true,
      rating: parseInt(radioValue),
      customer_name: $("#customer-name").val().trim()
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
    $("#devour-modal").modal("hide");

  });


  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var newBurger = {
      name: $("#burger-id").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function (result) {
        if (result.error) {
          console.log(result);
          $("#burger-error").text(result.error);
          $("#burger-id").val("");
        } else {
          $("#burger-error").text("");

          console.log("Added new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      });
  });
});
