import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
let inMemory: InMemoryUsersRepository;
let statementsRepository: IStatementsRepository;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe("Create statement", () => {
  beforeEach(() => {
    inMemory = new InMemoryUsersRepository();
    statementsRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(
      inMemory,
      statementsRepository
    );

    createUserUseCase = new CreateUserUseCase(inMemory);
  });

  it("Should able to create a new statement", async () => {
    const user = await createUserUseCase.execute({
      name: "marlliton",
      email: "test@test.com",
      password: "1234",
    });

    const statement = await createStatementUseCase.execute({
      user_id: user.id!,
      amount: 1234,
      description: "depósito",
      type: OperationType.DEPOSIT
    })

    expect(statement).toHaveProperty("id")
  });
});
