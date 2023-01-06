import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { globalRoutes } from "./routes";

const app = express();
app.use(express.json());

app.use(globalRoutes);

export default app;