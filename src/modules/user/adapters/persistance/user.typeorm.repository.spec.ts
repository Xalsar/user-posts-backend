import { Test, TestingModule } from '@nestjs/testing';
import { UserTypeOrmRepository } from './user.typeorm.respository';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserTypeOrmEntity } from './user.typeorm.entity';
import { User } from '../../app/domain/user';

jest.mock('./user.typeorm.entity');

describe('UserTypeOrmRepository', () => {
  let userRepository: UserTypeOrmRepository;
  let mockUserRepository: jest.Mocked<Repository<UserTypeOrmEntity>>;

  const mockUserEntity: UserTypeOrmEntity = {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@example.com',
    posts: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  } as UserTypeOrmEntity; // Cast to the class type since we cannot fully mock private properties

  const mockDomainUser: User = User.create({
    id: '1',
    name: 'John Doe',
    email: 'johndoe@example.com',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserTypeOrmRepository,
        {
          provide: getRepositoryToken(UserTypeOrmEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = module.get<UserTypeOrmRepository>(UserTypeOrmRepository);
    mockUserRepository = module.get<Repository<UserTypeOrmEntity>>(
      getRepositoryToken(UserTypeOrmEntity),
    ) as jest.Mocked<Repository<UserTypeOrmEntity>>;

    // Mock static method `toDomain` on `UserTypeOrmEntity`
    jest
      .spyOn(UserTypeOrmEntity, 'toDomain')
      .mockImplementation((entity) => mockDomainUser);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return all users as domain models', async () => {
      mockUserRepository.find.mockResolvedValue([mockUserEntity]);

      const users = await userRepository.findAll();

      expect(mockUserRepository.find).toHaveBeenCalledWith({
        relations: ['posts'],
      });
      expect(users).toEqual([mockDomainUser]);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUserEntity);

      const user = await userRepository.findByEmail('johndoe@example.com');

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'johndoe@example.com' },
      });
      expect(user).toEqual(mockDomainUser);
    });

    it('should return null if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      const user = await userRepository.findByEmail('notfound@example.com');

      expect(user).toBeNull();
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUserEntity);

      const user = await userRepository.findById('1');

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(user).toEqual(mockDomainUser);
    });

    it('should return null if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      const user = await userRepository.findById('nonexistent-id');

      expect(user).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and save a new user', async () => {
      mockUserRepository.create.mockReturnValue(mockUserEntity);
      mockUserRepository.save.mockResolvedValue(mockUserEntity);

      const newUser = await userRepository.create(mockDomainUser);

      expect(mockUserRepository.create).toHaveBeenCalledWith(mockDomainUser);
      expect(mockUserRepository.save).toHaveBeenCalledWith(mockUserEntity);
      expect(newUser).toEqual(mockDomainUser);
    });
  });

  describe('update', () => {
    it('should update and save an existing user', async () => {
      mockUserRepository.create.mockReturnValue(mockUserEntity);
      mockUserRepository.save.mockResolvedValue(mockUserEntity);

      const updatedUser = await userRepository.update(mockDomainUser);

      expect(mockUserRepository.create).toHaveBeenCalledWith(mockDomainUser);
      expect(mockUserRepository.save).toHaveBeenCalledWith(mockUserEntity);
      expect(updatedUser).toEqual(mockDomainUser);
    });
  });

  describe('delete', () => {
    it('should delete a user by id', async () => {
      const id = '1';
      await userRepository.delete(id);

      expect(mockUserRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
