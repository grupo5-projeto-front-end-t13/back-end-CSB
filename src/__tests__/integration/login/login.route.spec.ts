import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { userRepository } from "../../../repositories/userRepository";
import {
  mockedLoginNotAdmRequest,
  mockedLoginAdmRequest,
  mockedUserAdmRequest,
  mockedUserNotAdmRequest,
} from "../../mocks";
import request from "supertest";
import app from "../../../app";
import { compare } from "bcryptjs";
import { skillRepository } from "../../../repositories/skillRepository";

describe("Authentication", () => {
  let conn: DataSource;
  const baseUrl: string = "/login";
  let tokenAdm = "";
  let tokenNotAdm = "";

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

  it("should autheticate with valid credentials", async () => {
    const skills = await request(app).get("/users");

    const newUser = {
      name: "bruno",
      email: "bruno@gmail.com",
      password: "123456",
      skills: {
        id: skills.body[0].id,
      },
      type: "band",
      isAdm: true,
    };

    const user = userRepository.create(newUser);
    await userRepository.save(user);

    const response = await request(app)
      .post(baseUrl)
      .send(mockedLoginAdmRequest);

    const compareHash = await compare("123456", user.password);

    expect(compareHash).toBe(true);
  });

  it("Testando login válido", async () => {
    const user = userRepository.create(mockedUserAdmRequest);
    await userRepository.save(user);
    const response = await request(app)
      .post(baseUrl)
      .send(mockedLoginAdmRequest);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");

    const notAdmLogin = await request(app)
      .post("/login")
      .send(mockedLoginNotAdmRequest);
    tokenNotAdm = notAdmLogin.body.token;
    tokenAdm = response.body.token;
  });

  test("Testando login inválido", async () => {
    const user = userRepository.create(mockedUserAdmRequest);
    await userRepository.save(user);
    console.log(user);
    const user1 = await userRepository.findOneBy({ id: user.id });
    console.log(user1);
    const response = await request(app).post("/login").send({
      email: "bruno@gmail.com",
      password: "123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
