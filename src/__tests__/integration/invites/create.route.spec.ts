import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { inviteRepository } from "../../../repositories/inviteRepository";
import { userRepository } from "../../../repositories/userRepository";
import { skillRepository } from "../../../repositories/skillRepository";
import {
  mockedBand1,
  mockedBand1Login,
  mockedMusician1,
  mockedUserAdmRequest,
  mockedLoginAdmRequest,
} from "../../mocks";

describe("Create invite route tests", () => {
  let conn: DataSource;
  const baseUrl: string = "/invites";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    await conn.destroy();
  });

  beforeEach(async () => {
    const invites = await inviteRepository.find();
    await inviteRepository.remove(invites);
    const users = await userRepository.find();
    await userRepository.remove(users);
    const skills = await skillRepository.find();
    await skillRepository.remove(skills);
  });

  it("Should be able to create a invite", async () => {
    const userAdm = await request(app)
      .post("/users")
      .send(mockedUserAdmRequest);
    const verify = await request(app).get(`/users/verify/${userAdm.body.id}`);
    const loginAdm = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
    const skills = await request(app)
      .post("/skills")
      .send({ name: "tecladista2" })
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const user1 = await request(app)
      .post("/users")
      .send({ ...mockedBand1, skills: { id: skills.body.id } });
    await request(app).get(`/users/verify/${user1.body.id}`);
    const user2 = await request(app)
      .post("/users")
      .send({ ...mockedMusician1, skills: { id: skills.body.id } });
    await request(app).get(`/users/verify/${user2.body.id}`);

    const loginUser1 = await request(app).post("/login").send(mockedBand1Login);

    const response = await request(app)
      .post(baseUrl)
      .send({
        userIdSend: { id: user1.body.id },
        userIdReceive: { id: user2.body.id },
      })
      .set("Authorization", `Bearer ${loginUser1.body.token}`);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({ id: expect.any(String) })
    );
    expect(response.body).toEqual(
      expect.objectContaining({ createdAt: expect.any(String) })
    );

    const [invites, amount] = await inviteRepository.findAndCount();
    expect(amount).toBe(1);
  });

  it("Should not be able to create a invite not verified", async () => {
    const userAdm = await request(app)
      .post("/users")
      .send(mockedUserAdmRequest);
    const loginAdm = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
    const skills = await request(app)
      .post("/skills")
      .send({ name: "tecladista2" })
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const user1 = await request(app)
      .post("/users")
      .send({ ...mockedBand1, skills: { id: skills.body.id } });
    const user2 = await request(app)
      .post("/users")
      .send({ ...mockedMusician1, skills: { id: skills.body.id } });

    const loginUser1 = await request(app).post("/login").send(mockedBand1Login);

    const response = await request(app)
      .post(baseUrl)
      .send({
        userIdSend: { id: user1.body.id },
        userIdReceive: { id: user2.body.id },
      })
      .set("Authorization", `Bearer ${loginUser1.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("Should not be able to create a invite without token", async () => {
    const userAdm = await request(app)
      .post("/users")
      .send(mockedUserAdmRequest);
    const verify = await request(app).get(`/users/verify/${userAdm.body.id}`);
    const loginAdm = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
    const skills = await request(app)
      .post("/skills")
      .send({ name: "tecladista2" })
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const user1 = await request(app)
      .post("/users")
      .send({ ...mockedBand1, skills: { id: skills.body.id } });
    await request(app).get(`/users/verify/${user1.body.id}`);
    const user2 = await request(app)
      .post("/users")
      .send({ ...mockedMusician1, skills: { id: skills.body.id } });
    await request(app).get(`/users/verify/${user2.body.id}`);

    const response = await request(app)
      .post(baseUrl)
      .send({
        userIdSend: { id: user1.body.id },
        userIdReceive: { id: user2.body.id },
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");

    const [invites, amount] = await inviteRepository.findAndCount();
    expect(amount).toBe(0);
  });

  it("Should not be able to create a invite already exists", async () => {
    const userAdm = await request(app)
      .post("/users")
      .send(mockedUserAdmRequest);
    const verify = await request(app).get(`/users/verify/${userAdm.body.id}`);
    const loginAdm = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);
    const skills = await request(app)
      .post("/skills")
      .send({ name: "tecladista2" })
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const user1 = await request(app)
      .post("/users")
      .send({ ...mockedBand1, skills: { id: skills.body.id } });
    await request(app).get(`/users/verify/${user1.body.id}`);
    const user2 = await request(app)
      .post("/users")
      .send({ ...mockedMusician1, skills: { id: skills.body.id } });
    await request(app).get(`/users/verify/${user2.body.id}`);

    const loginUser1 = await request(app).post("/login").send(mockedBand1Login);

    const invite = await request(app)
      .post(baseUrl)
      .send({
        userIdSend: { id: user1.body.id },
        userIdReceive: { id: user2.body.id },
      })
      .set("Authorization", `Bearer ${loginUser1.body.token}`);

    const response = await request(app)
      .post(baseUrl)
      .send({
        userIdSend: { id: user1.body.id },
        userIdReceive: { id: user2.body.id },
      })
      .set("Authorization", `Bearer ${loginUser1.body.token}`);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });
});
