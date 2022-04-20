const validator = require("validator");
const isEmpty = require("../helpers/isEmpty");

const validateLoginInputs = (data) => {
  const errors = {};

  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  //---------------------------------------------|
  //           validate email
  //---------------------------------------------|
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  //---------------------------------------------|
  //           validate password
  //---------------------------------------------|
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = validateLoginInputs;
