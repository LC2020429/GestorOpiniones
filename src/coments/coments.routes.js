import { Router } from "express";
import {
  createComent,
  updateComent,
  deleteComentStatus,
  getComentsByPublicacion,
} from "../coments/coments.controller.js";

import {
  createComentValidator,
  updateComentValidator,
  deleteComentStatusValidator,
  getComentsByPublicacionValidator,
} from "../middlewares/coments-validator.js";

const router = Router();

router.post("/addComent", createComentValidator, createComent);

router.patch("/updateComent/:coid", updateComentValidator, updateComent);

router.delete(
  "/deleteComment/:coid",
  deleteComentStatusValidator,
  deleteComentStatus
);

router.get(
  "/getComentsByPublicacion/:pid",
  getComentsByPublicacionValidator,
  getComentsByPublicacion
);

export default router;
