import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let inMemory: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let createUserUseCase: CreateUserUseCase;
let statementsRepository: IStatementsRepository;
let getStatementOperation: GetStatementOperationUseCase;

enum OperationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

describe("Get statement operation", () => {
  beforeEach(() => {
    inMemory = new InMemoryUsersRepository();
    statementsRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(
      inMemory,
      statementsRepository
    );
    createUserUseCase = new CreateUserUseCase(inMemory);
    getStatementOperation = new GetStatementOperationUseCase(
      inMemory,
      statementsRepository
    );
  });

  it("Should able to get a statement operation", async () => {
    const user = await createUserUseCase.execute({
      name: "marlliton",
      email: "test@test.com",
      password: "1234",
    });
    const statement = await createStatementUseCase.execute({
      user_id: user.id!,
      amount: 1234,
      description: "depósito",
      type: OperationType.DEPOSIT,
    });

    const operation = await getStatementOperation.execute({
      user_id: user.id!,
      statement_id: statement.id!,
    });

    expect(operation).toHaveProperty("id")
  });
});
