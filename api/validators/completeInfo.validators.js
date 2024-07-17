//used to validate user input
const yup = require("yup");

const CompleteInfoValidator = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(
      /^\+?\d{1,14}$/,
      "Phone number must start with a '+' and have a maximum of 14 characters"
    ),
  occupation: yup.string(),
  country: yup.string(),
  birthDate: yup.date(),
  gender: yup.string(),
});

module.exports = {
  CompleteInfoValidator,
};
