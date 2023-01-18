import supertest from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

const request = supertest(app);
let connection: Connection;

describe("Authenticate user controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("Should be able to authenticate a user", async () => {
    await request.post("/api/v1/users").send({
      name: "marlliton",
      email: "test@test.com",
      password: "1234",
    });

    const response = await request.post("/api/v1/sessions").send({
      email: "test@test.com",
      password: "1234",
    });

    expect(response.body).toHaveProperty("token");
  });
});
