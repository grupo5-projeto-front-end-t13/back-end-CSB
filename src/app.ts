import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { globalRoutes } from "./routes";
import { errorHandler } from "./errors/errors";
import SwaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();
app.use(express.json());

app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));
app.use(globalRoutes);
app.use(errorHandler);

export default app;
