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

router.post("/addCategory", createCategoryValidator, saveCategory);

router.get("/findCategory/:cid", getByIdCategoryValidator, getCategory);

router.get("/", listCategories);

router.patch("/updateCategory/:cid", updateCategoryValidator, updateCategory);

router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;
