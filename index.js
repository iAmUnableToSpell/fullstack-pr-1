$(document).ready(function () {
  const username = $("#username");
  const firstname = $("#firstname");
  const lastname = $("#lastname");
  const phone = $("#phone");
  const fax = $("#fax");
  const email = $("#email");
  const adultsInput = $("#adults");
  const checkinInput = $("#checkin");
  const checkoutInput = $("#checkout");
  const days = $("#days");
  const total = $("#total");
  const resetButton = $("#reset");
  const submitButton = $("#submit");
  var price = 0;
  var duration = 0;

  adultsInput.change(updateTotal);
  checkinInput.change(updateTotal);
  checkoutInput.change(updateTotal);

  function updateTotal() {
    const adults = adultsInput.val();
    const checkin = moment(checkinInput.val());
    const checkout = moment(checkoutInput.val());
    duration = checkout.diff(checkin, "days");
    price = 150 * adults * duration;

    total.val(price);
    days.val(duration);
  }

  function validate(element, errMsg) {
    var success = true;
    if (element.val() == "") {
      element.closest(".form-group").addClass("has-error");
      toastr["error"](errMsg, "", { closeButton: true });
      success = false;
    } else {
      element.closest(".form-group").removeClass("has-error");
    }
    return success;
  }

  resetButton.click(function () {
    //This didnt work when I got it with jQuery.
    //No idea why, couldn't manage to debug it
    document.getElementById("bookingform").reset();
    toastr["info"]("Form Successfully Cleared", "", { closeButton: true });
  });

  submitButton.click(function () {
    //Yes i know this is horrifying
    //honestly thats partly why i kept it instead of a big compound if

    var success = true;
    success = validate(username, "Username is Required") && success;
    success = validate(firstname, "First Name is Required") && success;
    success = validate(lastname, "Last Name is Required") && success;
    success = validate(phone, "Phone Number is Required") && success;
    success = validate(fax, "Fax Number is Required") && success;
    success = validate(email, "Email is Required") && success;

    if (total.val() === "" || isNaN(total.val())) {
      toastr["error"]("Please Calculate a Cost", "", {
        closeButton: true
      });
      success = false;
    } else if (total.val() < 0) {
      toastr["error"]("Cost Cannot be Negative", "", {
        closeButton: true
      });
      success = false;
    }

    if (success) {
      toastr["success"]("Form Successfully Submitted", "", {
        closeButton: true
      });
    }
  });
});
