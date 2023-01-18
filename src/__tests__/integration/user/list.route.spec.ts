import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { userRepository } from "../../../repositories/userRepository";
import {
  mockedLoginAdmRequest,
  mockedLoginNotAdmRequest,
  mockedUserAdmRequest,
  mockedUserNotAdmRequest,
} from "../../mocks";

describe("List user route tests", () => {
  let conn: DataSource;
  const baseUrl: string = "/users";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    await conn.destroy();
  });

  beforeEach(async () => {
    const users = await userRepository.find();
    await userRepository.remove(users);
  });

  it("Must not be able to list all users without Admin permission", async () => {
    await request(app).post(baseUrl).send(mockedUserNotAdmRequest);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginNotAdmRequest);
    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  it("Must be able to list all users", async () => {
    await request(app).post(baseUrl).send(mockedUserAdmRequest);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).not.toHaveProperty("password");
  });
});
