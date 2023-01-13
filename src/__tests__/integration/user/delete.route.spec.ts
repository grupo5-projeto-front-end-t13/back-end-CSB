import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { userRepository } from "../../../repositories/userRepository";
import { mockedUserAdmRequest, mockedLoginAdmRequest } from "../../mocks";

describe("Delete user route tests", () => {
  let conn: DataSource;
  const baseUrl: string = "/users"

  beforeAll(async()=>{
    await AppDataSource.initialize()
    .then((res=> (conn = res)))
    .catch((err)=> console.error(err))
  });

  afterAll(async()=>{
    await conn.destroy()
  });

  beforeEach(async()=> {
    const users = await userRepository.find()
    await userRepository.remove(users)
  })

  it("Should not be able to delete user without authentication", async() => {
    await request(app).post(baseUrl).send(mockedUserAdmRequest);
    const loginResponse = await request(app).post("/login").send(mockedLoginAdmRequest);
    const deletedUser = await request(app).get(baseUrl).set("Authorization", `Bearer ${loginResponse.body.token}`);
    
    const response = await request(app).delete(`${baseUrl}/${deletedUser.body[0].id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("Should be able to delete user", async() => {
    await request(app).post(baseUrl).send(mockedUserAdmRequest);
    const loginResponse = await request(app).post("/login").send(mockedLoginAdmRequest);
    const deletedUser = await request(app).get(baseUrl).set("Authorization", `Bearer ${loginResponse.body.token}`);
    
    const response = await request(app).delete(`${baseUrl}/${deletedUser.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(204);
  });
})