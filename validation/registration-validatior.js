const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  /* Validator.isEmpty checks only empty string. 
   * Hence the empty value from the client is sent to custom isEmpty() to see if it is empty.
   * If it is empty and empty string is assigned
  */

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  //Check if name is empty
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  //Check the length of the name
  if (
    !Validator.isEmpty(data.name) &&
    !Validator.isLength(data.name, { min: 2, max: 30 })
  ) {
    errors.name = "Name must be between 2 and 30 characters";
  }

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

  //Validate the length of the password
  if (
    !Validator.isEmpty(data.password) &&
    !Validator.isLength(data.password, { min: 6, max: 30 })
  ) {
    errors.password = "Password must be minimum 6 characters";
  }

  //Check if confirm password is empty
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password field is required";
  }

  //Validate if password and confirmPassword match
  if (
    !Validator.isEmpty(data.confirmPassword) &&
    !Validator.equals(data.password, data.confirmPassword)
  ) {
    errors.confirmPassword = "Passwords do not match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
