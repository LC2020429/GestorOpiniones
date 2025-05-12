import { Router } from "express";
import {
  createPublicacion,
  getPublicacionById,
  updatePublicacion,
  deletePublicacion,
  getPublicacionesPublicas,
} from "../publicacion/publicacion.controller.js";

import {
  createPublicacionValidator,
  getByIdPublicacionValidator,
  updatePublicacionValidator,
  deletePublicacionValidator,
} from "../middlewares/publicacion-validator.js";

import { getUserById } from "../user/user.controller.js";
import { getUserByIdValidator } from "../middlewares/user-validator.js";

const router = Router();

/**
 * @swagger
 * /addPublicacion:
 *   post:
 *     summary: Create a new publicacion
 *     requestBody:
 *       description: Publicacion data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Publicacion created
 *       400:
 *         description: Invalid input
 */
router.post("/addPublicacion", createPublicacionValidator, createPublicacion);

/**
 * @swagger
 * /findPublicacion/{pid}:
 *   get:
 *     summary: Get publicacion by ID
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Publicacion ID
 *     responses:
 *       200:
 *         description: Publicacion found
 *       404:
 *         description: Publicacion not found
 */
router.get(
  "/findPublicacion/:pid",
  getByIdPublicacionValidator,
  getPublicacionById
);

/**
 * @swagger
 * /listByUser/{uid}:
 *   get:
 *     summary: List publicaciones by user ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Publicaciones found
 *       404:
 *         description: User not found
 */
router.get("/listByUser/:uid", getUserByIdValidator, getUserById);

/**
 * @swagger
 * /updatePublicacion/{pid}:
 *   patch:
 *     summary: Update publicacion
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Publicacion ID
 *     requestBody:
 *       description: Publicacion data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publicacion updated
 *       400:
 *         description: Invalid input
 */
router.patch(
  "/updatePublicacion/:pid",
  updatePublicacionValidator,
  updatePublicacion
);

/**
 * @swagger
 * /deletePublicacion/{pid}:
 *   delete:
 *     summary: Delete publicacion
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Publicacion ID
 *     responses:
 *       200:
 *         description: Publicacion deleted
 *       404:
 *         description: Publicacion not found
 */
router.delete(
  "/deletePublicacion/:pid",
  deletePublicacionValidator,
  deletePublicacion
);

router.get("/listPublicacionesPublicas", getPublicacionesPublicas);

export default router;
