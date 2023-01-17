import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { skillRepository } from "../../../repositories/skillRepository";

describe ('Skill route tests', () => {
  let conn: DataSource;
  const baseUrl: string = "/skills"

  beforeAll(async () => {
    await AppDataSource.initialize()
    .then((res=> (conn = res)))
    .catch((err)=> console.error(err))
  });

  afterAll(async () => {
    await conn.destroy();
  });

  beforeEach(async () =>  {
    const skills = await skillRepository.find();
    await skillRepository.remove(skills);
  });

  it("should list all skills", async () => {
    const response = await request(app).get(baseUrl);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});