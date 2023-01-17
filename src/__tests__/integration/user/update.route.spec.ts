import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { userRepository } from "../../../repositories/userRepository";
import {
  mockedBand1,
  mockedBand1Login,
  mockedLoginAdmRequest,
  mockedLoginNotAdmRequest,
  mockedUserAdmRequest,
} from "../../mocks";

describe("Update user route tests", () => {
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

  it("Should not be able update user without authentication", async () => {
    const newValues = { name: "Mario K. Bruno", password: 123 };

    const userAdm = await request(app).post(baseUrl).send(mockedUserAdmRequest);
    const loginAdm = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
    const createSkill = await request(app)
      .post("/skills")
      .send({ name: "Guitarrista" })
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const user = await request(app)
      .post(baseUrl)
      .send({
        name: "bruno2",
        email: "bruno2@gmail.com",
        password: "123456",
        type: "band",
        skills: { id: createSkill.body.id },
      });

    const response = await request(app)
      .patch(`/users/${user.body.id}`)
      .send(newValues);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("Should not be able to update user with invalid id", async () => {
    const newValues = { name: "Mario K. Bruno", password: 123 };

    const userAdm = await request(app).post(baseUrl).send(mockedUserAdmRequest);
    const loginAdm = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
    const createSkill = await request(app)
      .post("/skills")
      .send({ name: "Guitarrista" })
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const user = await request(app)
      .post(baseUrl)
      .send({
        name: "bruno2",
        email: "bruno2@gmail.com",
        password: "123456",
        type: "band",
        skills: { id: createSkill.body.id },
      });

    const userLogin = await request(app)
      .post("/login")
      .send(mockedLoginNotAdmRequest);
    const response = await request(app)
      .patch(`/users/4e99808c-c06d-4109-9b95-1a2fef3f8ea7`)
      .send(newValues)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("Should not be able to update a user other than your own", async () => {
    const newValues = { name: "Mario K. Bruno", password: 123 };

    const userAdm = await request(app).post(baseUrl).send(mockedUserAdmRequest);
    const loginAdm = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
    const createSkill = await request(app)
      .post("/skills")
      .send({ name: "Guitarrista" })
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const user = await request(app)
      .post(baseUrl)
      .send({
        name: "bruno2",
        email: "bruno2@gmail.com",
        password: "123456",
        type: "band",
        skills: { id: createSkill.body.id },
      });

    const userLogin = await request(app)
      .post("/login")
      .send(mockedLoginNotAdmRequest);

    const user2 = await request(app).post(baseUrl).send(mockedBand1);
    const user2Login = await request(app).post("/login").send(mockedBand1Login);

    const response = await request(app)
      .patch(`/users/${user.body.id}`)
      .send(newValues)
      .set("Authorization", `Bearer ${user2Login.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("Should be able to update your own user", async () => {
    const newValues = { name: "Mario K. Bruno", password: 123 };

    const userAdm = await request(app).post(baseUrl).send(mockedUserAdmRequest);
    const loginAdm = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
    const createSkill = await request(app)
      .post("/skills")
      .send({ name: "Guitarrista" })
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const user = await request(app)
      .post(baseUrl)
      .send({
        name: "bruno2",
        email: "bruno2@gmail.com",
        password: "123456",
        type: "band",
        skills: { id: createSkill.body.id },
      });

    const userLogin = await request(app)
      .post("/login")
      .send(mockedLoginNotAdmRequest);
    const response = await request(app)
      .patch(`/users/${user.body.id}`)
      .send(newValues)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("Mario K. Bruno");
    expect(response.body).not.toHaveProperty("password");
  });

  it("Should be able to update any user being admin", async () => {
    const newValues = { name: "Lype Platinas", email: "eoplatinas@mail.com" };

    const userAdm = await request(app).post(baseUrl).send(mockedUserAdmRequest);
    const loginAdm = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
    const createSkill = await request(app)
      .post("/skills")
      .send({ name: "Guitarrista" })
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const user = await request(app)
      .post(baseUrl)
      .send({
        name: "bruno2",
        email: "bruno2@gmail.com",
        password: "123456",
        type: "band",
        skills: { id: createSkill.body.id },
      });

    const userLogin = await request(app)
      .post("/login")
      .send(mockedLoginNotAdmRequest);
    const response = await request(app)
      .patch(`/users/${user.body.id}`)
      .send(newValues)
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("Lype Platinas");
    expect(response.body.email).toEqual("eoplatinas@mail.com");
    expect(response.body).not.toHaveProperty("password");
  });
});
