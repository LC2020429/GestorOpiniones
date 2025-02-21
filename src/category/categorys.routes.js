import { Router } from "express";
import {
  getCategory,
  listCategories,
  deleteCategory,
  saveCategory,
  updateCategory,
} from "./categorys.controller.js";

import {
  createCategoryValidator,
  getByIdCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../middlewares/category-validator.js";

const router = Router();

/**
 * @swagger
 * /addCategory:
 *   post:
 *     summary: Create a new category
 *     requestBody:
 *       description: Category data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Invalid input
 */
router.post("/addCategory", createCategoryValidator, saveCategory);

/**
 * @swagger
 * /findCategory/{cid}:
 *   get:
 *     summary: Get category by ID
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
router.get("/findCategory/:cid", getByIdCategoryValidator, getCategory);

/**
 * @swagger
 * /:
 *   get:
 *     summary: List all categories
 *     responses:
 *       200:
 *         description: Categories found
 *       404:
 *         description: No categories found
 */
router.get("/", listCategories);

/**
 * @swagger
 * /updateCategory/{cid}:
 *   patch:
 *     summary: Update category
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       description: Category data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       400:
 *         description: Invalid input
 */
router.patch("/updateCategory/:cid", updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /deleteCategory/{cid}:
 *   delete:
 *     summary: Delete category
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;
