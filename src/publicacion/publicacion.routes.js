import { Router } from "express";
import {
  createPublicacion,
  getPublicacionById,
  updatePublicacion,
} from "../publicacion/publicacion.controller.js";

import {
  createPublicacionValidator,
  getByIdPublicacionValidator,
  updatePublicacionValidator,
} from "../middlewares/publicacion-validator.js";

import { getUserById } from "../user/user.controller.js";
import { getUserByIdValidator } from "../middlewares/user-validator.js";

const router = Router();

router.post("/addPublicacion", createPublicacionValidator, createPublicacion);

router.get("/findPublicacion/:pid", getByIdPublicacionValidator, getPublicacionById);

router.get("/listByUser/:uid", getUserByIdValidator, getUserById);

router.patch("/updatePublicacion/:pid", updatePublicacionValidator, updatePublicacion);

export default router;