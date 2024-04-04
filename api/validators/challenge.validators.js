const yup = require("yup");

const challengeSchemaValidator = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  categories: yup.array().of(yup.string()),
  price: yup
    .number("")
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be a positive number"),
  deadline: yup.date(),
  skills: yup.array().of(yup.string()),
  paid: yup.string().required("paid is required"),
  nbruser: yup
    .number("")
    .typeError("Nbruser must be a number")
    .required("Nbruser is required")
    .positive("Nbruser must be a positive number"),
});

module.exports = {
  challengeSchemaValidator,
};
