import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { userRepository } from "../../../repositories/userRepository";
import {
  mockedUserInvalidBodyRequest,
  mockedUserInvalidBodyResponse,
  mockedUserAdmRequest,
  mockedUserUniqueEmailResponse,
  mockedUserNotAdmRequest,
  mockedLoginAdmRequest,
} from "../../mocks";

describe("Create user route tests", () => {
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

  it("Should not be able to create a invalid user", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedUserInvalidBodyRequest);

    const expectResults = {
      status: 400,
      bodyToEqual: mockedUserInvalidBodyResponse,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );

    const [users, amount] = await userRepository.findAndCount();
    expect(amount).toBe(0);
  });

  it("Should be able create user", async () => {
    const userAdm = await request(app).post(baseUrl).send(mockedUserAdmRequest);
    const loginAdm = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
    const createSkill = await request(app)
      .post("/skills")
      .send({ name: "Guitarrista" })
      .set("Authorization", `Bearer ${loginAdm.body.token}`);
    const findSkill = await request(app).get("/skills");

    const response = await request(app)
      .post(baseUrl)
      .send({
        name: "bruno2",
        email: "bruno2@gmail.com",
        password: "123456",
        type: "band",
        skills: { id: findSkill.body[0].id },
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("type");
    expect(response.body.skills).toEqual(
      expect.objectContaining({ id: expect.any(String) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ id: expect.any(String) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ createdAt: expect.any(String) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ updatedAt: expect.any(String) })
    );
    expect(response.body).not.toHaveProperty("password");
  });

  it("Should not be able to create user / unique user", async () => {
    await request(app).post(baseUrl).send(mockedUserNotAdmRequest);
    const response = await request(app)
      .post(baseUrl)
      .send(mockedUserNotAdmRequest);

    const expectResults = {
      status: 409,
      bodyToEqual: mockedUserUniqueEmailResponse,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );

    const [users, amount] = await userRepository.findAndCount();
    expect(amount).toBe(1);
  });
});
