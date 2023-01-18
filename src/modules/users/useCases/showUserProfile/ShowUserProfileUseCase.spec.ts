import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;
let inMemory: InMemoryUsersRepository;

describe("Show User Profile", () => {
  beforeEach(() => {
    inMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemory);
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemory);
  });

  it("Should show the profile user", async () => {
    const user = await createUserUseCase.execute({
      name: "marlliton",
      email: "test@test.com",
      password: "1234",
    });

    const profile = await showUserProfileUseCase.execute(user.id!);
    expect(profile).toHaveProperty("id")
  });
});
