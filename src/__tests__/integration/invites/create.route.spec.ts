import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { inviteRepository } from "../../../repositories/inviteRepository";
import { mockedBand1, mockedBand1Login, mockedMusician1 } from "../../mocks";

describe("Create invite route tests", ()=>{
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

  beforeEach(async()=> {
    const invites = await inviteRepository.find()
    await inviteRepository.remove(invites)
  })

  it("Should be able to create a invite", async()=>{
    const user1 = await request(app).post("/users").send(mockedBand1);
    const user2 = await request(app).post("/users").send(mockedMusician1);
    const loginUser1 = await request(app).post("/login").send(mockedBand1Login)
    const response = await request(app).post(baseUrl).send({userIdSend: {id: user1.body.id},
    userIdReceive: {id: user2.body.id}},).set("Authorization", `Bearer ${loginUser1.body.token}`);
    
    expect(response.status).toBe(201)
    expect(response.body).toEqual(expect.objectContaining({id: expect.any(String)}))
    expect(response.body).toEqual(expect.objectContaining({createdAt: expect.any(String)}))

    const [invites, amount] = await inviteRepository.findAndCount()
    expect(amount).toBe(1)
  });
});