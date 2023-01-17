import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { inviteRepository } from "../../../repositories/inviteRepository";
import { userRepository } from "../../../repositories/userRepository";
import { mockedBand1, mockedBand1Login, mockedMusician1,mockedUserNotAdmRequest,mockedLoginNotAdmRequest,mockedUserAdmRequest,mockedLoginAdmRequest } from "../../mocks";

describe("Delete invite route tests", () => {
  let conn: DataSource;
  const baseUrl: string = "/invites"

  beforeAll(async()=>{
    await AppDataSource.initialize()
    .then((res=> (conn = res)))
    .catch((err)=> console.error(err))
  });

  afterAll(async()=>{
    await conn.destroy()
  });

  beforeEach(async() => {
    const invites = await inviteRepository.find()
    await inviteRepository.remove(invites)
    const users = await userRepository.find()
    await userRepository.remove(users)
  });

  it("should be able to delete invites", async() => {
    const user1 = await request(app).post("/users").send(mockedBand1);
    const user2 = await request(app).post("/users").send(mockedMusician1);
    const loginUser1 = await request(app).post("/login").send(mockedBand1Login)
    const invite = await request(app).post(baseUrl).send({userIdSend: {id: user1.body.id},
      userIdReceive: {id: user2.body.id}}).set("Authorization", `Bearer ${loginUser1.body.token}`);
    const response = await request(app).delete(`${baseUrl}/${invite.body.id}`).set("Authorization", `Bearer ${loginUser1.body.token}`)
      
    expect(response.status).toBe(204)
  });

  it("adm should not be able to delete invites that not own", async() => {
    const user1 = await request(app).post("/users").send(mockedBand1);
    const user2 = await request(app).post("/users").send(mockedMusician1); 
    const userAdm = await request(app).post("/users").send(mockedUserAdmRequest);

    const loginUser1 = await request(app).post("/login").send(mockedBand1Login);
    const loginAdm = await request(app).post("/login").send(mockedLoginAdmRequest);

    const invite = await request(app).post(baseUrl).send({userIdSend: {id: user2.body.id},
    userIdReceive: {id: user1.body.id}},).set("Authorization", `Bearer ${loginUser1.body.token}`);
    const response = await request(app).delete(`${baseUrl}/${invite.body.id}`).set("Authorization", `Bearer ${loginAdm.body.token}`)

    expect(response.status).toBe(401),
    expect(response.body).toHaveProperty("message")
  });

  it("should not be able to delete invites without token", async() => {
    const user1 = await request(app).post("/users").send(mockedBand1);
    const user2 = await request(app).post("/users").send(mockedMusician1);
    const loginUser1 = await request(app).post("/login").send(mockedBand1Login)
    const invite = await request(app).post(baseUrl).send({userIdSend: {id: user2.body.id},
      userIdReceive: {id: user1.body.id}},).set("Authorization", `Bearer ${loginUser1.body.token}`);
    const response = await request(app).delete(`${baseUrl}/${invite.body.id}`)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  });

  it("should not be able to delete invites with invalid id", async() => {
    const user1 = await request(app).post("/users").send(mockedBand1);
    const loginUser1 = await request(app).post("/login").send(mockedBand1Login)
    
    const response = await request(app).delete(`${baseUrl}/${"4e99808c-c06d-4109-9b95-1a2fef3f8ea7"}`).set("Authorization", `Bearer ${loginUser1.body.token}`)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message")
  });

  it("should not be able to delete invites if not owner", async() => {
    const user1 = await request(app).post("/users").send(mockedBand1);
    const user2 = await request(app).post("/users").send(mockedMusician1); 
    const userNotAdm = await request(app).post("/users").send(mockedUserNotAdmRequest);

    const loginUser1 = await request(app).post("/login").send(mockedBand1Login);
    const loginNotAdm = await request(app).post("/login").send(mockedLoginNotAdmRequest);

    const invite = await request(app).post(baseUrl).send({userIdSend: {id: user2.body.id},
      userIdReceive: {id: user1.body.id}},).set("Authorization", `Bearer ${loginUser1.body.token}`);
    const response = await request(app).delete(`${baseUrl}/${invite.body.id}`).set("Authorization", `Bearer ${loginNotAdm.body.token}`)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  });
})