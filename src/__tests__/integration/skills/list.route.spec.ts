import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { skillRepository } from "../../../repositories/skillRepository";
import { mockedUserAdmRequest, mockedLoginAdmRequest} from "../../mocks";
describe ('Skill route tests', () => {
  let conn: DataSource;
  const baseUrl: string = "/skills"

  beforeAll(async()=>{
    await AppDataSource.initialize()
    .then((res=> (conn = res)))
    .catch((err)=> console.error(err))
  });

  afterAll(async()=>{
    await conn.destroy()
  });

  beforeEach(async()=> {
    const skills = await skillRepository.find()
    await skillRepository.remove(skills)
  })

  it("should be able to create", async()=>{
    const userAdm = await request(app).post("/users").send(mockedUserAdmRequest)
    const loginUserAdm = await request(app).post("/login").send(mockedLoginAdmRequest)
    console.log(loginUserAdm.body)
    const response = await request(app).post(baseUrl).send({name: "tecladista2"}).set("Authorization", `Bearer ${loginUserAdm.body.token}`)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")

    const [skills, amount] = await skillRepository.findAndCount()
    expect(amount).toBe(1)
  })


  it("should list all skills", async()=>{
    const response = await request(app).get(baseUrl)
    
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true);
  })
})