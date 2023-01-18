import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { mockedLoginAdmRequest, mockedUserAdmRequest } from "../../mocks";
import request from "supertest";
import app from "../../../app";
import { userRepository } from "../../../repositories/userRepository";

describe("Login route tests", () => {
  let conn: DataSource;
  const baseUrl: string = "/login";

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

  it("should authenticate with valid credentials", async () => {
    await request(app).post("/users").send(mockedUserAdmRequest);
    const response = await request(app)
      .post(baseUrl)
      .send(mockedLoginAdmRequest);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should not authenticate with invalid credentials", async () => {
    await request(app).post("/users").send(mockedUserAdmRequest);

    const response = await request(app).post("/login").send({
      email: "bruno@gmail.com",
      password: "123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
