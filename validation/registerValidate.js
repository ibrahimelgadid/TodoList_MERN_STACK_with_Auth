const validator = require("validator");
const isEmpty = require("../helpers/isEmpty");

const validateRegistrationInputs = (data) => {
  const errors = {};

  data.username = isEmpty(data.username) ? "" : data.username;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.confirmPassword = isEmpty(data.confirmPassword)
    ? ""
    : data.confirmPassword;

  //---------------------------------------------|
  //           validate username
  //---------------------------------------------|
  if (!validator.isLength(data.username, { min: 3, max: 20 })) {
    errors.username = "Username value must be between 3 and 20 charchter";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  //---------------------------------------------|
  //           validate email
  //---------------------------------------------|
  if (!validator.isEmail(data.email)) {
    errors.email = "Insert valid email";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  //---------------------------------------------|
  //           validate password
  //---------------------------------------------|
  if (!validator.isLength(data.password, { min: 4, max: 20 })) {
    errors.password = "Password value must be between 4 and 20 charchter";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  //---------------------------------------------|
  //           validate confirmPassword
  //---------------------------------------------|
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "ConfirmPassword is required";
  }

  if (!validator.equals(data.confirmPassword, data.password)) {
    errors.confirmPassword = "Confirm password doesn't match";
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = validateRegistrationInputs;
