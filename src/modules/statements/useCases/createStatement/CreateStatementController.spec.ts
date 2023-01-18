import supertest from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

const request = supertest(app);
let connection: Connection;

describe("Create statement", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("Should be able to create a statement", async () => {
    await request.post("/api/v1/users").send({
      name: "marlliton",
      email: "test@test.com",
      password: "1234",
    });

    const authenticatedUser = await request.post("/api/v1/sessions").send({
      email: "test@test.com",
      password: "1234",
    });
    const { token } = authenticatedUser.body;

    const response = await request
      .post("/api/v1/statements/deposit")
      .send({
        amount: 500,
        description: "Depósito",
      })
      .set({ Authorization: `Bearer ${token}` });
    
    expect(response.statusCode).toBe(201);
  });

  it("Should be able to get balance", async () => {
    await request.post("/api/v1/users").send({
      name: "marlliton",
      email: "test@test.com",
      password: "1234",
    });

    const authenticatedUser = await request.post("/api/v1/sessions").send({
      email: "test@test.com",
      password: "1234",
    });
    const { token } = authenticatedUser.body;

    const response = await request
      .post("/api/v1/statements/withdraw")
      .send({
        amount: 500,
        description: "Saque"
      })
      .set({ Authorization: `Bearer ${token}` });
    

    expect(response.body).toHaveProperty("id")
  });
});
