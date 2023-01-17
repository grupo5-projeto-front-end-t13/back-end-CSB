import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { skillRepository } from "../../../repositories/skillRepository";
import { mockedUserAdmRequest, mockedLoginAdmRequest, mockedBand1, mockedBand1Login} from "../../mocks";

describe ('Delete skill route tests', () => {
  let conn: DataSource;
  const baseUrl: string = "/skills"

  beforeAll(async () => {
    await AppDataSource.initialize()
    .then((res=> (conn = res)))
    .catch((err)=> console.error(err))
  });

  afterAll(async () => {
    await conn.destroy()
  });

  beforeEach(async () =>  {
    const skills = await skillRepository.find();
    await skillRepository.remove(skills);
  });

  
  it("should not be able to delete skills without authentication", async () => {
      const userAdm = await request(app).post("/users").send(mockedUserAdmRequest);
      const admLogin = await request(app).post("/login").send(mockedLoginAdmRequest);
      const createSkill = await request(app).post(baseUrl).send({ name: "Guitarrista" }).set("Authorization", `Bearer ${admLogin.body.token}`);
      const response = await request(app).delete(`${baseUrl}/${createSkill.body.id}`);

      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty("message");
  });

  it("should not be able to delete skills without admin permission", async () => {
    const user = await request(app).post("/users").send(mockedBand1);
    const userLogin = await request(app).post("/login").send(mockedBand1Login);
    
    const userAdm = await request(app).post("/users").send(mockedUserAdmRequest);
    const admLogin = await request(app).post("/login").send(mockedLoginAdmRequest);
    const createSkill = await request(app).post(baseUrl).send({ name: "Guitarrista" }).set("Authorization", `Bearer ${admLogin.body.token}`);
    
    const response = await request(app).delete(`${baseUrl}/${createSkill.body.id}`).set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  it("Should not be able to delete skills with invalid id" , async() => {
    const userAdm = await request(app).post("/users").send(mockedUserAdmRequest);
    const admLogin = await request(app).post("/login").send(mockedLoginAdmRequest);
    const createSkill = await request(app).post(baseUrl).send({ name: "Guitarrista" }).set("Authorization", `Bearer ${admLogin.body.token}`);
    
    const response = await request(app).delete(`${baseUrl}/${"4e99808c-c06d-4109-9b95-1a2fef3f9fb8"}`).set("Authorization", `Bearer ${admLogin.body.token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("should be able to delete skills", async () => {
    const userAdm = await request(app).post("/users").send(mockedUserAdmRequest);
    const admLogin = await request(app).post("/login").send(mockedLoginAdmRequest);
    const createSkill = await request(app).post(baseUrl).send({ name: "Guitarrista" }).set("Authorization", `Bearer ${admLogin.body.token}`);
    
    const response = await request(app).delete(`${baseUrl}/${createSkill.body.id}`).set("Authorization", `Bearer ${admLogin.body.token}`);

    expect(response.statusCode).toBe(204);
  });
});