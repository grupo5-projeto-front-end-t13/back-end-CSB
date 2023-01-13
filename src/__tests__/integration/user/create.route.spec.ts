import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { userRepository } from "../../../repositories/userRepository";
import { mockedUserInvalidBodyRequest, mockedUserInvalidBodyResponse, mockedUserAdmRequest, mockedUserUniqueEmailResponse, mockedUserNotAdmRequest, mockedLoginAdmRequest, mockedLoginNotAdmRequest } from "../../mocks";

describe("Create user route tests", () => {
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

  it("Should be able to create user", async() => {
    const response = await request(app).post(baseUrl).send(mockedUserNotAdmRequest);

   expect(response.status).toBe(201)
   expect(response.body).toEqual(expect.objectContaining({id: expect.any(String)}))
   expect(response.body).toEqual(expect.objectContaining({createdAt: expect.any(String)}))
   expect(response.body).toEqual(expect.objectContaining({updatedAt: expect.any(String)}))
   expect(response.body).not.toHaveProperty("password")

    const [users, amount] = await userRepository.findAndCount()
    expect(amount).toBe(1)
  })

  it("Should not be able to create user", async() => {
    const response = await request(app).post(baseUrl).send(mockedUserInvalidBodyRequest);

    const expectResults = {
      status: 400,
      bodyToEqual: mockedUserInvalidBodyResponse
    }

    expect(response.status).toBe(expectResults.status)
    expect(response.body).toEqual(expect.objectContaining(expectResults.bodyToEqual))
  
    const [users, amount] = await userRepository.findAndCount()
    expect(amount).toBe(0)
  })

  it("Should not be able to create user / unique user", async () => {
    await request(app).post(baseUrl).send(mockedUserNotAdmRequest);
    const response = await request(app).post(baseUrl).send(mockedUserNotAdmRequest);

    const expectResults = {
      status: 409,
      bodyToEqual: mockedUserUniqueEmailResponse
    }
    
    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(expect.objectContaining(expectResults.bodyToEqual));
    
    const [users, amount] = await userRepository.findAndCount()
    expect(amount).toBe(1)
  });
});
