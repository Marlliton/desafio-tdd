import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;

describe("Create user", () => {
  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(new InMemoryUsersRepository());
  });
  it("Should authenticate a user", async () => {
    const user = await createUserUseCase.execute({
      name: "marlliton",
      email: "test@test.com",
      password: "1234",
    });

    expect(user).toHaveProperty("id")
  });
});
