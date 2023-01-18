import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { inviteRepository } from "../../../repositories/inviteRepository";
import { skillRepository } from "../../../repositories/skillRepository";
import { userRepository } from "../../../repositories/userRepository";
import {mockedBand1,mockedBand1Login,mockedMusician1,mockedUserNotAdmRequest,mockedLoginNotAdmRequest,mockedUserAdmRequest,mockedLoginAdmRequest} from "../../mocks";

describe("Delete invite route tests", () => {
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
    const skills = await skillRepository.find()
    await skillRepository.remove(skills)
  });

  it("should be able to delete invites", async () => {
    const userAdm = await request(app).post("/users").send(mockedUserAdmRequest);
    const loginAdm = await request(app).post("/login").send(mockedLoginAdmRequest);
    const skills = await request(app).post("/skills").send({ name: "tecladista2" }).set("Authorization", `Bearer ${loginAdm.body.token}`);

    const user1 = await request(app).post("/users").send({...mockedBand1,skills:{id:skills.body.id}});
    await request(app).get(`/users/verify/${user1.body.id}`);
    const user2 = await request(app).post("/users").send({...mockedMusician1,skills:{id:skills.body.id}});

    const loginUser1 = await request(app).post("/login").send(mockedBand1Login);
  
    const invite = await request(app).post(baseUrl)
      .send({
        userIdSend: { id: user1.body.id },
        userIdReceive: { id: user2.body.id },
      })
      .set("Authorization", `Bearer ${loginUser1.body.token}`);

    const response = await request(app)
      .delete(`${baseUrl}/${invite.body.id}`)
      .set("Authorization", `Bearer ${loginUser1.body.token}`);

    expect(response.status).toBe(204);
  });

  it("adm should not be able to delete invites that not own", async () => {
    const userAdm = await request(app).post("/users").send(mockedUserAdmRequest);
    const loginAdm = await request(app).post("/login").send(mockedLoginAdmRequest);
    const skills = await request(app).post("/skills").send({ name: "tecladista2" }).set("Authorization", `Bearer ${loginAdm.body.token}`);

    const user1 = await request(app).post("/users").send({...mockedBand1,skills:{id:skills.body.id}});
    await request(app).get(`/users/verify/${user1.body.id}`);
    const user2 = await request(app).post("/users").send({...mockedMusician1,skills:{id:skills.body.id}});

    const loginUser1 = await request(app).post("/login").send(mockedBand1Login);

    const invite = await request(app)
      .post(baseUrl)
      .send({
        userIdSend: { id: user2.body.id },
        userIdReceive: { id: user1.body.id },
      })
      .set("Authorization", `Bearer ${loginUser1.body.token}`);

    const response = await request(app)
      .delete(`${baseUrl}/${invite.body.id}`)
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    expect(response.status).toBe(401),
    expect(response.body).toHaveProperty("message");
  });

  it("should not be able to delete invites without token", async () => {
    const userAdm = await request(app).post("/users").send(mockedUserAdmRequest);
    const loginAdm = await request(app).post("/login").send(mockedLoginAdmRequest);
    const skills = await request(app).post("/skills").send({ name: "tecladista2" }).set("Authorization", `Bearer ${loginAdm.body.token}`);

    const user1 = await request(app).post("/users").send({...mockedBand1,skills:{id:skills.body.id}});
    await request(app).get(`/users/verify/${user1.body.id}`);
    const user2 = await request(app).post("/users").send({...mockedMusician1,skills:{id:skills.body.id}});

    const loginUser1 = await request(app).post("/login").send(mockedBand1Login);

    const invite = await request(app)
      .post(baseUrl)
      .send({
        userIdSend: { id: user2.body.id },
        userIdReceive: { id: user1.body.id },
      })
      .set("Authorization", `Bearer ${loginUser1.body.token}`);

    const response = await request(app).delete(`${baseUrl}/${invite.body.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be able to delete invites with invalid id", async () => {
    const userAdm = await request(app).post("/users").send(mockedUserAdmRequest);
    const loginAdm = await request(app).post("/login").send(mockedLoginAdmRequest);
    const skills = await request(app).post("/skills").send({ name: "tecladista2" }).set("Authorization", `Bearer ${loginAdm.body.token}`);

    const user1 = await request(app).post("/users").send({...mockedBand1,skills:{id:skills.body.id}});
    await request(app).get(`/users/verify/${user1.body.id}`);
    const user2 = await request(app).post("/users").send({...mockedMusician1,skills:{id:skills.body.id}});

    const loginUser1 = await request(app).post("/login").send(mockedBand1Login);

    const response = await request(app)
      .delete(`${baseUrl}/${"4e99808c-c06d-4109-9b95-1a2fef3f8ea7"}`)
      .set("Authorization", `Bearer ${loginUser1.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be able to delete invites if not owner", async () => {
    const userAdm = await request(app).post("/users").send(mockedUserAdmRequest);
    const loginAdm = await request(app).post("/login").send(mockedLoginAdmRequest);
    const skills = await request(app).post("/skills").send({ name: "tecladista2" }).set("Authorization", `Bearer ${loginAdm.body.token}`);

    const user1 = await request(app).post("/users").send({...mockedBand1,skills:{id:skills.body.id}});
    await request(app).get(`/users/verify/${user1.body.id}`);
    const user2 = await request(app).post("/users").send({...mockedMusician1,skills:{id:skills.body.id}});
    const userNotAdm = await request(app).post("/users").send({...mockedUserNotAdmRequest,skills:{id:skills.body.id}});

    const loginUser1 = await request(app).post("/login").send(mockedBand1Login);
    const loginNotAdm = await request(app)
      .post("/login")
      .send(mockedLoginNotAdmRequest);

    const invite = await request(app)
      .post(baseUrl)
      .send({
        userIdSend: { id: user2.body.id },
        userIdReceive: { id: user1.body.id },
      })
      .set("Authorization", `Bearer ${loginUser1.body.token}`);
      
    const response = await request(app)
      .delete(`${baseUrl}/${invite.body.id}`)
      .set("Authorization", `Bearer ${loginNotAdm.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
