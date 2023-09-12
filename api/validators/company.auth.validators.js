//used to validate user input
const yup = require("yup");

const companyRegisterValidator = yup.object().shape({
  firstname: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name must only contain letters"),
  lastname: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name must only contain letters"),
  companyName: yup.string().required("companyName is required"),
  password: yup
    .string()
    .required()
    .max(1024)
    .min(6, "Password must be at least 6 characters long"),
  email: yup.string().email("Email must be a valid email address").required(),
  role: yup.string().required("role is required"),
});

const companyEditProfileValidator = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
  email: yup.string().email("Email must be a valid email address"),
  phoneNumber: yup
    .string()
    .matches(
      /^\+?\d{1,14}$/,
      "Phone number must start with a '+' and have a maximum of 14 characters",
    ),
  country: yup.string(),
  dateoffoundation: yup.string(),
  companyLogo: yup.string(),
  companyDescription: yup.string(),
});

module.exports = {
  companyRegisterValidator,
  companyEditProfileValidator,
};
