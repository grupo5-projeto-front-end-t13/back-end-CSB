import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { userRepository } from "../../../repositories/userRepository";
import { mockedUserInvalidBodyRequest, mockedUserInvalidBodyResponse, mockedUserAdmRequest, mockedUserUniqueEmailResponse } from "../../mocks";


describe("Create user route tests", ()=>{
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

  it("Should be able to create user", async()=>{
    const response = await request(app).post(baseUrl).send(mockedUserAdmRequest);

   expect(response.status).toBe(201)
   expect(response.body).toEqual(expect.objectContaining({id: expect.any(String)}))
   expect(response.body).toEqual(expect.objectContaining({createdAt: expect.any(String)}))
   expect(response.body).toEqual(expect.objectContaining({updatedAt: expect.any(String)}))
   expect(response.body).not.toHaveProperty("password")
   

    const [users, amount] = await userRepository.findAndCount()
    expect(amount).toBe(1)

  })


  it("Should not be able to create user", async()=>{
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


it("Testando criação de usuário com e-mail já utilizado", async () => {
  
  const user  = userRepository.create(mockedUserAdmRequest)
  await userRepository.save(user)
  
  const response = await request(app).post("/users").send(mockedUserAdmRequest);
  
  expect(response.status).toBe(409);
  expect(response.body).toHaveProperty("message");
  
  // const [users, amount] = await userRepository.findAndCount()
  // expect(amount).toBe(1)

});

  // it("Should not be able to create user / unique user", async()=>{

  //   const user  = userRepository.create(mockedUserRequest)
  //   await userRepository.save(user)

  //   const response = await request(app).post(baseUrl).send(mockedUserRequest);

  //   const expectResults = {
  //     status: 409,
  //     bodyToEqual: mockedUserUniqueEmailResponse
  //   }

  //   expect(response.status).toBe(expectResults.status)
  //   expect(response.body).toEqual(expect.objectContaining(expectResults.bodyToEqual))
    

  //   const [users, amount] = await userRepository.findAndCount()
  //   expect(amount).toBe(1)

  // })



});
