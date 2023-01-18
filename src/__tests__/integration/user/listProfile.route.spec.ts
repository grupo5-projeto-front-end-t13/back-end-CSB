import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { userRepository } from "../../../repositories/userRepository";
import {
  mockedLoginAdmRequest,
  mockedUserAdmRequest
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
    const admin = await request(app).post(baseUrl).send(mockedUserAdmRequest);
    const adminLogin = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);

    const createSkill = await request(app).post("/skills").send({ name: "Guitarrista" }).set("Authorization", `Bearer ${adminLogin.body.token}`);
    const findSkill = await request(app).get("/skills");

    const user = await request(app).post(baseUrl).send({
      name: "bruno2",
      email: "bruno2@gmail.com",
      password: "123456",
      type: "band",
      skills: { id: findSkill.body[0].id },
    });

    const userLogin = await request(app).post("/login").send({
      email: "bruno2@gmail.com",
      password: "123456"
    });

    const response = await request(app)
      .get(`${baseUrl}/profile`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("skills");
    expect(response.body).toHaveProperty("type");
  });
});
