import supertest from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

const request = supertest(app);
let connection: Connection;

describe("Show user profile", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("Should be able to get a user profile", async () => {
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
      .get("/api/v1/profile")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.body).toBeTruthy();
    expect(response.body).toHaveProperty("id");
  });
});
