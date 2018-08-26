const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  /* Validator.isEmpty checks only empty string. 
   * Hence the empty value from the client is sent to custom isEmpty() to see if it is empty.
   * If it is empty and empty string is assigned
  */

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //Check if email is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  //Check for valid email
  if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
    errors.email = "Invalid email address";
  }

  //Check if password is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
