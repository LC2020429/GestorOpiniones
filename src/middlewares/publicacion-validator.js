import { body, param } from "express-validator";
import { publicacionExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-admin.js";
import { isOwner } from "./validate-login.js";

export const createPublicacionValidator = [
  validateJWT,
  hasRoles("USER"),
  body("title")
    .notEmpty()
    .withMessage("El título es requerido")
    .isLength({ max: 25 })
    .withMessage("El título no puede superar los 25 caracteres"),
  body("textPubli")
    .notEmpty()
    .withMessage("El texto es requerido")
    .isLength({ max: 500 })
    .withMessage("El texto no puede superar los 500 caracteres"),
  body("categories")
    .isArray()
    .optional()
    .withMessage("Las categorías deben ser un arreglo"),
  validarCampos,
  handleErrors,
];

export const getByIdPublicacionValidator = [
  validateJWT,
  isOwner,
  hasRoles("USER"),
  param("pid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("pid").custom(publicacionExists),
  validarCampos,
  handleErrors,
];

export const updatePublicacionValidator = [
  validateJWT,
  hasRoles("USER"),
  isOwner,
  param("pid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("pid").custom(publicacionExists),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .isLength({ max: 25 })
    .withMessage("El título no puede superar los 25 caracteres"),
  body("textPubli")
    .optional()
    .notEmpty()
    .withMessage("El texto no puede estar vacío")
    .isLength({ max: 500 })
    .withMessage("El texto no puede superar los 500 caracteres"),
  validarCampos,
  handleErrors,
];

export const deletePublicacionValidator = [
  validateJWT,
  isOwner,
  hasRoles("USER"),
  hasRoles("USER"),
  param("pid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("pid").custom(publicacionExists),
  validarCampos,
  handleErrors,
];
