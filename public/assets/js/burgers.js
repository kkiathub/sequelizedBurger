// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

  function reloadPage() {
    var orderState = "/" + $("input[name='order-type']:checked").val()
      + "/" + $("input[name='order-by']:checked").val();

    $.get(orderState, function (data) {
      console.log("get data");
      document.open();
      document.write(data);
      document.close();
    });

  }

  $('input:radio[name="order-type"]').change(function () {
    console.log("radio selected: " + $("input[name='order-type']:checked").val());
    reloadPage();
  });

  $('input:radio[name="order-by"]').change(function () {
    console.log("radio selected: " + $("input[name='order-by']:checked").val());
    reloadPage();
  });

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
