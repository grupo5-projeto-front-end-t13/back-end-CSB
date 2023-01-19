import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { skillRepository } from "../../../repositories/skillRepository";
import { mockedUserAdmRequest, mockedLoginAdmRequest } from "../../mocks";
import { userRepository } from "../../../repositories/userRepository";

describe("Delete skill route tests", () => {
  let conn: DataSource;
  const baseUrl: string = "/skills";

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
    const skills = await skillRepository.find();
    await userRepository.remove(users);
    await skillRepository.remove(skills);
  });

  it("should not be able to update skills without authentication", async () => {
    const userAdm = await request(app)
      .post("/users")
      .send(mockedUserAdmRequest);
    const admLogin = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
    const createSkill = await request(app)
      .post(baseUrl)
      .send({ name: "Guitarista" })
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const response = await request(app)
      .patch(`${baseUrl}/${createSkill.body.id}`)
      .send({ name: "Guitarrista" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be able to update skills without admin permission", async () => {
    const userAdm = await request(app)
      .post("/users")
      .send(mockedUserAdmRequest);
    const loginAdm = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
    const createSkill = await request(app)
      .post("/skills")
      .send({ name: "Guitarista" })
      .set("Authorization", `Bearer ${loginAdm.body.token}`);
    const findSkill = await request(app).get("/skills");

    const user = await request(app)
      .post("/users")
      .send({
        name: "bruno2",
        email: "bruno2@gmail.com",
        password: "123456",
        type: "band",
        skills: { id: findSkill.body[0].id },
      });

    const userLogin = await request(app).post("/login").send({
      email: "bruno2@gmail.com",
      password: "123456",
    });

    const response = await request(app)
      .patch(`${baseUrl}/${createSkill.body.id}`)
      .send({ name: "Guitarrista" })
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  it("Should not be able to update skills with invalid id", async () => {
    const userAdm = await request(app)
      .post("/users")
      .send(mockedUserAdmRequest);
    const admLogin = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);

    const createSkill = await request(app)
      .post(baseUrl)
      .send({ name: "Guitarrista" })
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const findSkill = await request(app).get("/skills");

    const response = await request(app)
      .patch(`${baseUrl}/${"4e99808c-c06d-4109-9b95-1a2fefaskjdhgskajh"}`)
      .send({ name: "Guitarrista" })
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("should be able to update skills", async () => {
    const userAdm = await request(app)
      .post("/users")
      .send(mockedUserAdmRequest);
    const admLogin = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
    const createSkill = await request(app)
      .post(baseUrl)
      .send({ name: "Guitarista" })
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const findSkill = await request(app).get(baseUrl);

    const response = await request(app)
      .patch(`${baseUrl}/${createSkill.body.id}`)
      .send({ name: "Guitarrista" })
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(findSkill.body[0].id);
    expect(response.body.name).toEqual("Guitarrista");
  });
});
