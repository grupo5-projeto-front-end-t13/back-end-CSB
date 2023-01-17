import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { skillRepository } from "../../../repositories/skillRepository";
import { mockedUserAdmRequest, mockedLoginAdmRequest, mockedBand1, mockedBand1Login} from "../../mocks";

describe ('Create skill route tests', () => {
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

  it("should not be able to create skills without authentication", async () => {
    const userAdm = await request(app).post("/users").send(mockedUserAdmRequest);
    
    const response = await request(app).post(baseUrl).send({name: "tecladista2"});

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("should not be able to create skills without admin permission", async () => {
    const user = await request(app).post("/users").send(mockedBand1);
    const userLogin = await request(app).post("/login").send(mockedBand1Login);
    
    const response = await request(app).post(baseUrl).send({name: "tecladista2"}).set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  it("should be able to create skills", async () => {
    const userAdm = await request(app).post("/users").send(mockedUserAdmRequest);
    const loginUserAdm = await request(app).post("/login").send(mockedLoginAdmRequest);
    
    const response = await request(app).post(baseUrl).send({name: "tecladista2"}).set("Authorization", `Bearer ${loginUserAdm.body.token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    const [skills, amount] = await skillRepository.findAndCount();
    expect(amount).toBe(1);
  });
});