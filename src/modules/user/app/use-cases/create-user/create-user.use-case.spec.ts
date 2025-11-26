import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user.use-case';
import { UserRepositoryPort } from '../../ports/user-repository.port';
import { CreateUserInput } from './inputs/create-user.input';
import { User } from '../../domain/user';
import { UserWithThatEmailAlradyExistsException } from './exceptions/user-with-that-email-alrady-exists.exception';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: jest.Mocked<UserRepositoryPort>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepositoryPort,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get(
      UserRepositoryPort,
    ) as jest.Mocked<UserRepositoryPort>;
  });

  it('should create a new user successfully', async () => {
    // Arrange
    const userData: CreateUserInput = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    const createdUser = User.create({ ...userData, id: 'user-123' });

    userRepository.findByEmail.mockResolvedValueOnce(null);
    userRepository.create.mockResolvedValueOnce(createdUser);

    // Act
    const result = await createUserUseCase.execute(userData);

    // Assert
    expect(result).toEqual(createdUser);
    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining(userData),
    );
  });

  it('should throw an error if a user with the same email already exists', async () => {
    // Arrange
    const userData: CreateUserInput = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    const existingUser = User.create({ ...userData, id: 'user-456' });

    userRepository.findByEmail.mockResolvedValueOnce(existingUser);

    // Act & Assert
    await expect(createUserUseCase.execute(userData)).rejects.toThrow(
      new UserWithThatEmailAlradyExistsException(userData.email),
    );
    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should handle repository errors when finding by email', async () => {
    // Arrange
    const userData: CreateUserInput = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    userRepository.findByEmail.mockRejectedValueOnce(
      new Error('Database connection error'),
    );

    // Act & Assert
    await expect(createUserUseCase.execute(userData)).rejects.toThrow(
      'Database connection error',
    );
    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should handle repository errors when creating the user', async () => {
    // Arrange
    const userData: CreateUserInput = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    userRepository.findByEmail.mockResolvedValueOnce(null);
    userRepository.create.mockRejectedValueOnce(
      new Error('Save operation failed'),
    );

    // Act & Assert
    await expect(createUserUseCase.execute(userData)).rejects.toThrow(
      'Save operation failed',
    );
    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(userRepository.create).toHaveBeenCalled();
  });
});
