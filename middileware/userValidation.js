import { body, check } from "express-validator";

export const validationMiddleware = [
  body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Invalid email").normalizeEmail(),
  body("phoneNumber")
    .optional()
    .isMobilePhone("any", { strictMode: false })
    .withMessage("Invalid phone number")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits"),
  body("phoneNumber")
    .isMobilePhone("any", { strictMode: false })
    .withMessage("Phone Number is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("passwordConfirmation")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

export const passwordConfirmationMiddileware = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("passwordConfirmation")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

export const userLoginMiddileware = [
  body("email").trim().isEmail().withMessage("Invalid email").normalizeEmail(),
   body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];
export const updateUserMiddleware = [
  check("image")
    .custom((value, { req }) => req.files && req.files.image)
    .withMessage("Image is required"),
  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender. Allowed values: male, female, other"),
  body("dateOfBirth")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Invalid date format. Use YYYY-MM-DD"),
];