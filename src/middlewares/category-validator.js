import { body, param } from "express-validator";
import { categoryExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-admin.js";

export const createCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("categoryName").notEmpty().withMessage("El nombre es requerido"),
    validarCampos,
    handleErrors
];

export const getByIdCategoryValidator = [
    validateJWT,
    param("cid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    hasRoles("ADMIN"),
    param("cid").custom(categoryExists),
    validarCampos,
    handleErrors
];

export const updateCategoryValidator = [
    validateJWT,
    param("cid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("cid").custom(categoryExists),
    hasRoles("ADMIN"),
    body("categoryName").optional().notEmpty().withMessage("El nombre es requerido"),
    validarCampos,
    handleErrors
];

export const deleteCategoryValidator = [
    validateJWT,
    param("cid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("cid").custom(categoryExists),
    hasRoles("ADMIN"),
    validarCampos,
    handleErrors
];
