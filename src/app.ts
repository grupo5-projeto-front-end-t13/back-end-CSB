import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { globalRoutes } from "./routes";
import { errorHandler } from "./errors/errors";

const app = express();
app.use(express.json());

app.use(globalRoutes);
app.use(errorHandler);

export default app;