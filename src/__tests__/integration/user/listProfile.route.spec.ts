import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { userRepository } from "../../../repositories/userRepository";
import {
  mockedLoginNotAdmRequest,
  mockedUserNotAdmRequest,
} from "../../mocks/";

describe("List user profile tests", () => {
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

  it("Must not be able to list user profile without token", async () => {
    const response = await request(app).get(`${baseUrl}/profile`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("Must not be able to list user profile with invalid token", async () => {
    const response = await request(app)
      .get(`${baseUrl}/profile`)
      .set("Authorization", "Bearer bd88e9dc-94e2-11ed-a1eb-0242ac120002");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("Must be able to list user profile", async () => {
    await request(app).post(baseUrl).send(mockedUserNotAdmRequest);
    const logedUser = await request(app)
      .post("/login")
      .send(mockedLoginNotAdmRequest);
    const response = await request(app)
      .get(`${baseUrl}/profile`)
      .set("Authorization", `Bearer ${logedUser.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("skills");
    expect(response.body).toHaveProperty("type");
  });
});
