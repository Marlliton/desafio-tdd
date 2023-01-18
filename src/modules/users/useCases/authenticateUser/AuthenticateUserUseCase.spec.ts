import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let authenticateUser: AuthenticateUserUseCase;
let inMemory: InMemoryUsersRepository;

describe("Authenticate user", () => {
  beforeEach(() => {
    inMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemory);
    authenticateUser = new AuthenticateUserUseCase(inMemory);
  });

  it("Should authenticate a user", async () => {
    const user = await createUserUseCase.execute({
      name: "marlliton",
      email: "test@test.com",
      password: "1234",
    });

    const authenticatedUser = await authenticateUser.execute({
      email: user.email,
      password: "1234",
    });

    expect(authenticatedUser).toHaveProperty("token")
  });
});
