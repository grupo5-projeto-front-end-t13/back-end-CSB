import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { userRepository } from "../../../repositories/userRepository";

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
    const users = await userRepository.find()
    await userRepository.remove(users)
  })
})