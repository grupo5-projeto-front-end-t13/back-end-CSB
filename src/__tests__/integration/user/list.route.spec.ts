import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { skillRepository } from "../../../repositories/skillRepository";
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
    const skills = await skillRepository.find();
    await userRepository.remove(users);
    await skillRepository.remove(skills);
  });

  it("Must not be able to list all users without Admin permission", async () => {
    const admin = await request(app).post(baseUrl).send(mockedUserAdmRequest);
    // const verify = await request(app).get(`/users/verify/${admin.body.id}`);
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

    // await request(app).get(`${baseUrl}/verify/${user.body.id}`);

    const userlogin = await request(app)
      .post("/login")
      .send(mockedLoginNotAdmRequest);

    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${userlogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  it("Must be able to list all users", async () => {
    const admin = await request(app).post(baseUrl).send(mockedUserAdmRequest);
    // const verify = await request(app).get(`/users/verify/${admin.body.id}`);
    const adminLogin = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
      
    const response = await request(app).get(baseUrl).set("Authorization", `Bearer ${adminLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).not.toHaveProperty("password");
  });
});
