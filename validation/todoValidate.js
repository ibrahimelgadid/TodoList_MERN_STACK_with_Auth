const validator = require("validator");
const isEmpty = require("../helpers/isEmpty");

const validatetodoInputs = (data) => {
  const errors = {};

  data.title = isEmpty(data.title) ? "" : data.title;

  //---------------------------------------------|
  //           validate title
  //---------------------------------------------|
  if (!validator.isLength(data.title, { min: 3, max: 20 })) {
    errors.title = "title value must be between 3 and 20 charchter";
  }

  if (validator.isEmpty(data.title)) {
    errors.title = "title is required";
  }

  //---------------------------------------------|
  //           validate body
  //---------------------------------------------|
  if (!validator.isLength(data.body, { min: 8, max: 50 })) {
    errors.body = "body value must be between 8 and 50 charchter";
  }

  if (validator.isEmpty(data.body)) {
    errors.body = "body is required";
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = validatetodoInputs;
