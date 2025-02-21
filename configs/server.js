"use strict";
import express from "express";
import cors from "cors";
import { hash } from "argon2";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/user/user.routes.js";
import categoryRoutes from "../src/category/categorys.routes.js";
import publicacionRoutes from "../src/publicacion/publicacion.routes.js";
import User from "../src/user/user.model.js";
import { dbConnection } from "./mongo.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";

const middlewares = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(apiLimiter);
};
const crearAdministrador = async () => {
  try {
    const adminExist = await User.findOne({ username: "AdminOpinionGestor" });

    if (!adminExist) {
      const encryptedPassword = await hash("Key40RAdm!nSuper");
      const admin = new User({
        name: "Admin",
        username: "AdminOpinionGestor",
        email: "AdminOpinionGestor@gmail.com",
        password: encryptedPassword,
        phone: 11110000,
        role: "ADMIN",
      });
      await admin.save();
    }
  } catch (err) {
    console.log(`Error al crear al administrador ${err}`);
  }
};

const routes = (app) => {
  app.use("/gestorOpinions/v1/auth", authRoutes);
  app.use("/gestorOpinions/v1/user", userRoutes);
  app.use("/gestorOpinions/v1/categoria", categoryRoutes);
  app.use("/gestorOpinions/v1/publicacion", publicacionRoutes);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
const conectarDB = async () => {
  try {
    await dbConnection();
  } catch (err) {
    console.log(`Database connection failed: ${err}`);
    process.exit(1);
  }
};

export const initServer = () => {
  const app = express();
  try {
    middlewares(app);
    conectarDB();
    routes(app);
    crearAdministrador();
    const port = process.env.PORT || 3002;
    app.listen(port, () => {
      console.log(`Server running on port ${port} `);
    });
  } catch (err) {
    console.log(`Server init failed: ${err}`);
  }
};
