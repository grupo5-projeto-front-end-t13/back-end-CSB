import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { userRepository } from "../../../repositories/userRepository";
import { mockedUserAdmRequest, mockedLoginAdmRequest } from "../../mocks";

describe("Delete user route tests", () => {
  let conn: DataSource;
  const baseUrl: string = "/users";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    await conn.destroy();
  });

  beforeEach(async () => {
    const users = await userRepository.find();
    await userRepository.remove(users);
  });

  it("Should not be able to delete user without authentication", async () => {
    const admin = await request(app).post(baseUrl).send(mockedUserAdmRequest);
    // const verify = await request(app).get(`/users/verify/${admin.body.id}`);
    const adminLogin = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);

    const createSkill = await request(app).post("/skills").send({ name: "Guitarrista" }).set("Authorization", `Bearer ${adminLogin.body.token}`);
    const findSkill = await request(app).get("/skills");
  
    const deletedUser = await request(app).post(baseUrl).send({
        name: "bruno2",
        email: "bruno2@gmail.com",
        password: "123456",
        type: "band",
        skills: { id: findSkill.body[0].id },
      });

    // await request(app).get(`/users/verify/${deletedUser.body.id}`);
    
    const response = await request(app).delete(
      `${baseUrl}/${deletedUser.body.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("Should not be able to delete a invalid user", async () => {
    const admin = await request(app).post(baseUrl).send(mockedUserAdmRequest);
    // await request(app).post(`/verify/${admin.body.id}`);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);

    const response = await request(app)
      .delete(`${baseUrl}/4e99808c-c06d-4109-9b95-1a2fef3f8ea7}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("Should not be able to delete a user other than your own", async () => {
    const admin = await request(app).post(baseUrl).send(mockedUserAdmRequest);
    // const verify = await request(app).get(`/users/verify/${admin.body.id}`);
    const adminLogin = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);

    const createSkill = await request(app).post("/skills").send({ name: "Guitarrista" }).set("Authorization", `Bearer ${adminLogin.body.token}`);
    const findSkill = await request(app).get("/skills");

    const user1 = await request(app).post(baseUrl).send({
      name: "bruno2",
      email: "bruno2@gmail.com",
      password: "123456",
      type: "band",
      skills: { id: findSkill.body[0].id },
    });

    // await request(app).get(`/users/verify/${user1.body.id}`);

    const userLogin1 = await request(app)
      .post("/login")
      .send({
        email: "bruno2@gmail.com",
        password: "123456"
    });

    const user2 = await request(app).post(baseUrl).send({
        name: "bruno",
        email: "bruno3@gmail.com",
        password: "123456",
        type: "band",
        skills: { id: findSkill.body[0].id },
    });

    // await request(app).get(`/users/verify/${user2.body.id}`);
    
    const response = await request(app).delete(
      `${baseUrl}/${user2.body.id}`
    ).set("Authorization", `Bearer ${userLogin1.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
});

  it("Should be able to delete any user being admin", async () => {
    const admin = await request(app).post(baseUrl).send(mockedUserAdmRequest);
    // const verify = await request(app).get(`/users/verify/${admin.body.id}`);
    const adminLogin = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);

    const createSkill = await request(app).post("/skills").send({ name: "Guitarrista" }).set("Authorization", `Bearer ${adminLogin.body.token}`);
    const findSkill = await request(app).get("/skills");
  
    const deletedUser = await request(app).post(baseUrl).send({
        name: "bruno2",
        email: "bruno2@gmail.com",
        password: "123456",
        type: "band",
        skills: { id: findSkill.body[0].id },
      });

    // await request(app).get(`/users/verify/${deletedUser.body.id}`);
    
    const response = await request(app).delete(
      `${baseUrl}/${deletedUser.body.id}`
    ).set("Authorization", `Bearer ${adminLogin.body.token}`);

    expect(response.status).toBe(204);
  });

  it("Should be able to delete your own user", async () => {
    const admin = await request(app).post(baseUrl).send(mockedUserAdmRequest);
    // const verify = await request(app).get(`/users/verify/${admin.body.id}`);
    const adminLogin = await request(app)
      .post("/login")
      .send(mockedLoginAdmRequest);

    const createSkill = await request(app).post("/skills").send({ name: "Guitarrista" }).set("Authorization", `Bearer ${adminLogin.body.token}`);
    const findSkill = await request(app).get("/skills");
  
    const user = await request(app).post(baseUrl).send({
        name: "bruno2",
        email: "bruno2@gmail.com",
        password: "123456",
        type: "band",
        skills: { id: findSkill.body[0].id },
      });

    // await request(app).get(`/users/verify/${user.body.id}`);
    
    const userLogin = await request(app).post("/login")
    .send({
      email: "bruno2@gmail.com",
      password: "123456"
    });
    
    const response = await request(app).delete(
      `${baseUrl}/${user.body.id}`
    ).set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(204);
  });
});
