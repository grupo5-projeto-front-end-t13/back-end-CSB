import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { inviteRepository } from "../../../repositories/inviteRepository";
import { mockedInviteRequest } from "../../mocks";

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
    const response = await request(app).post(baseUrl).send(mockedInviteRequest)
    console.log(response.body)
    expect(response.status).toBe(201)
    expect(response.body).toEqual(expect.objectContaining({id: expect.any(String)}))
    expect(response.body).toEqual(expect.objectContaining({createdAt: expect.any(String)}))

    const [invites, amount] = await inviteRepository.findAndCount()
    expect(amount).toBe(1)
  })



})