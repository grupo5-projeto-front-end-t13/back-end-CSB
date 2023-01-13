import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import app from "../../app";

describe("Testing _INVITES_ routes", () => {
  let conection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );
  });

  afterAll(async () => {
    await conection.destroy();
  });
});
