import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-admin.js";
import Coment from "../coments/coments.model.js";
import { publicacionExists } from "../helpers/db-validators.js";

export const createComentValidator = [
  validateJWT,
  hasRoles("USER"),
  body("textComent")
    .notEmpty()
    .withMessage("El texto del comentario es requerido")
    .isLength({ max: 200 })
    .withMessage("El comentario no puede superar los 200 caracteres"),
  body("publicacionComent")
    .notEmpty()
    .withMessage("La publicación es requerida")
    .isMongoId()
    .withMessage("La publicación debe ser un ID de MongoDB válido")
    .custom(publicacionExists)
    .withMessage("La publicación no existe"),
  validarCampos,
  handleErrors,
];

export const updateComentValidator = [
  validateJWT,
  hasRoles("USER"),
  param("coid")
    .isMongoId()
    .withMessage("No es un ID válido de MongoDB")
    .custom(async (coid) => {
      const coment = await Coment.findById(coid);
      if (!coment) {
        throw new Error("Comentario no encontrado");
      }
    }),
  body("textComent")
    .optional()
    .notEmpty()
    .withMessage("El texto del comentario no puede estar vacío")
    .isLength({ max: 200 })
    .withMessage("El comentario no puede superar los 200 caracteres"),
  validarCampos,
  handleErrors,
];

export const deleteComentStatusValidator = [
  validateJWT,
  hasRoles("USER"),
  param("coid")
    .isMongoId()
    .withMessage("No es un ID válido de MongoDB")
    .custom(async (coid) => {
      const coment = await Coment.findById(coid);
      if (!coment) {
        throw new Error("Comentario no encontrado");
      }
    }),
  validarCampos,
  handleErrors,
];

export const getComentsByPublicacionValidator = [
  param("pid")
    .isMongoId()
    .withMessage("No es un ID válido de MongoDB")
    .custom(publicacionExists)
    .withMessage("La publicación no existe"),
  validarCampos,
  handleErrors,
];