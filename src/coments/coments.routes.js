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

/**
 * @swagger
 * /addComent:
 *   post:
 *     summary: Create a new comment
 *     requestBody:
 *       description: Comment data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               publicacionId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 *       400:
 *         description: Invalid input
 */
router.post("/addComent", createComentValidator, createComent);

/**
 * @swagger
 * /updateComent/{coid}:
 *   patch:
 *     summary: Update comment
 *     parameters:
 *       - in: path
 *         name: coid
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       description: Comment data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated
 *       400:
 *         description: Invalid input
 */
router.patch("/updateComent/:coid", updateComentValidator, updateComent);

/**
 * @swagger
 * /deleteComment/{coid}:
 *   delete:
 *     summary: Delete comment
 *     parameters:
 *       - in: path
 *         name: coid
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 *       404:
 *         description: Comment not found
 */
router.delete(
  "/deleteComment/:coid",
  deleteComentStatusValidator,
  deleteComentStatus
);

/**
 * @swagger
 * /getComentsByPublicacion/{pid}:
 *   get:
 *     summary: Get comments by publicacion ID
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Publicacion ID
 *     responses:
 *       200:
 *         description: Comments found
 *       404:
 *         description: Publicacion not found
 */
router.get(
  "/getComentsByPublicacion/:pid",
  getComentsByPublicacionValidator,
  getComentsByPublicacion
);

export default router;
