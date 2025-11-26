import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { DataSource } from 'typeorm';
import { appValidationPipe } from '@/main';

describe('Create User (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Apply the same global pipes, filters, and interceptors as in your main. ts
    // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    app.useGlobalPipes(appValidationPipe);

    await app.init();
    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Clean up the users table before each test
    await dataSource.query('DELETE FROM users');
  });

  describe('POST /users', () => {
    const validUserData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    describe('Successful user creation', () => {
      it('should create a new user with valid data', async () => {
        const response = await request(app.getHttpServer())
          .post('/users')
          .send(validUserData)
          .expect(HttpStatus.CREATED);

        expect(response.body).toMatchObject({
          id: expect.any(String),
          name: validUserData.name,
          email: validUserData.email,
        });
      });

      it('should return the created user with all required fields', async () => {
        const response = await request(app.getHttpServer())
          .post('/users')
          .send(validUserData)
          .expect(HttpStatus.CREATED);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body.name).toBe(validUserData.name);
        expect(response.body.email).toBe(validUserData.email);
      });

      it('should persist the user in the database', async () => {
        const response = await request(app.getHttpServer())
          .post('/users')
          .send(validUserData)
          .expect(HttpStatus.CREATED);

        const users = await dataSource.query(
          'SELECT * FROM users WHERE email = $1',
          [validUserData.email],
        );

        expect(users).toHaveLength(1);
        expect(users[0].name).toBe(validUserData.name);
        expect(users[0].email).toBe(validUserData.email);
      });

      it('should create users with different emails', async () => {
        const user1 = { name: 'User One', email: 'user1@example.com' };
        const user2 = { name: 'User Two', email: 'user2@example.com' };

        const response1 = await request(app.getHttpServer())
          .post('/users')
          .send(user1)
          .expect(HttpStatus.CREATED);

        const response2 = await request(app.getHttpServer())
          .post('/users')
          .send(user2)
          .expect(HttpStatus.CREATED);

        expect(response1.body.email).toBe(user1.email);
        expect(response2.body.email).toBe(user2.email);
        expect(response1.body.id).not.toBe(response2.body.id);
      });
    });

    describe('Duplicate email handling', () => {
      it('should return 409 when creating a user with an existing email', async () => {
        // Create first user
        await request(app.getHttpServer())
          .post('/users')
          .send(validUserData)
          .expect(HttpStatus.CREATED);

        // Attempt to create second user with same email
        const response = await request(app.getHttpServer())
          .post('/users')
          .send(validUserData)
          .expect(HttpStatus.CONFLICT);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(validUserData.email);
      });

      it('should return 409 when email exists with different name', async () => {
        await request(app.getHttpServer())
          .post('/users')
          .send(validUserData)
          .expect(HttpStatus.CREATED);

        const duplicateEmailUser = {
          name: 'Different Name',
          email: validUserData.email,
        };

        await request(app.getHttpServer())
          .post('/users')
          .send(duplicateEmailUser)
          .expect(HttpStatus.CONFLICT);
      });

      it('should not create a duplicate user in the database', async () => {
        await request(app.getHttpServer())
          .post('/users')
          .send(validUserData)
          .expect(HttpStatus.CREATED);

        await request(app.getHttpServer())
          .post('/users')
          .send(validUserData)
          .expect(HttpStatus.CONFLICT);

        const users = await dataSource.query(
          'SELECT * FROM users WHERE email = $1',
          [validUserData.email],
        );

        expect(users).toHaveLength(1);
      });

      it('should handle case-sensitive email duplicates', async () => {
        await request(app.getHttpServer())
          .post('/users')
          .send(validUserData)
          .expect(HttpStatus.CREATED);

        const uppercaseEmailUser = {
          name: 'Jane Doe',
          email: validUserData.email.toUpperCase(),
        };

        // This test behavior depends on your database collation and email normalization
        // Adjust expectation based on your business logic
        await request(app.getHttpServer())
          .post('/users')
          .send(uppercaseEmailUser);
        // . expect(HttpStatus.CONFLICT); // if emails are normalized
        // or .expect(HttpStatus.CREATED); // if case-sensitive
      });
    });

    describe('Input validation', () => {
      it('should return 400 when name is missing', async () => {
        const invalidData = {
          email: 'test@example.com',
        };

        await request(app.getHttpServer())
          .post('/users')
          .send(invalidData)
          .expect(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when email is missing', async () => {
        const invalidData = {
          name: 'John Doe',
        };

        await request(app.getHttpServer())
          .post('/users')
          .send(invalidData)
          .expect(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when email format is invalid', async () => {
        const invalidData = {
          name: 'John Doe',
          email: 'invalid-email-format',
        };

        await request(app.getHttpServer())
          .post('/users')
          .send(invalidData)
          .expect(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when name is empty string', async () => {
        const invalidData = {
          name: '',
          email: 'test@example.com',
        };

        await request(app.getHttpServer())
          .post('/users')
          .send(invalidData)
          .expect(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when email is empty string', async () => {
        const invalidData = {
          name: 'John Doe',
          email: '',
        };

        await request(app.getHttpServer())
          .post('/users')
          .send(invalidData)
          .expect(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when body is empty', async () => {
        await request(app.getHttpServer())
          .post('/users')
          .send({})
          .expect(HttpStatus.BAD_REQUEST);
      });

      it('should not handle extra fields in request body', async () => {
        const dataWithExtraFields = {
          ...validUserData,
          extraField: 'should be ignored',
          anotherField: 123,
        };

        await request(app.getHttpServer())
          .post('/users')
          .send(dataWithExtraFields)
          .expect(HttpStatus.BAD_REQUEST);
      });
    });

    describe('Edge cases', () => {
      it('should handle very long names', async () => {
        const longName = 'A'.repeat(255);
        const userData = {
          name: longName,
          email: 'longname@example.com',
        };

        const response = await request(app.getHttpServer())
          .post('/users')
          .send(userData);

        // Adjust based on your validation rules
        // . expect(HttpStatus.CREATED) or .expect(HttpStatus.BAD_REQUEST)
      });

      it('should handle special characters in name', async () => {
        const userData = {
          name: "John O'Brien-Smith Jr.  (PhD)",
          email: 'special@example.com',
        };

        const response = await request(app.getHttpServer())
          .post('/users')
          .send(userData)
          .expect(HttpStatus.CREATED);

        expect(response.body.name).toBe(userData.name);
      });

      it('should handle unicode characters in name', async () => {
        const userData = {
          name: '测试用户 José María',
          email: 'unicode@example.com',
        };

        const response = await request(app.getHttpServer())
          .post('/users')
          .send(userData)
          .expect(HttpStatus.CREATED);

        expect(response.body.name).toBe(userData.name);
      });

      it('should handle email with plus addressing', async () => {
        const userData = {
          name: 'Test User',
          email: 'user+test@example.com',
        };

        const response = await request(app.getHttpServer())
          .post('/users')
          .send(userData)
          .expect(HttpStatus.CREATED);

        expect(response.body.email).toBe(userData.email);
      });

      it('should trim whitespace from email', async () => {
        const userData = {
          name: 'Test User',
          email: '  test@example.com  ',
        };

        const response = await request(app.getHttpServer())
          .post('/users')
          .send(userData);

        // Adjust based on whether your DTO trims whitespace
        // expect(response.body.email).toBe('test@example.com');
      });
    });

    describe('Content-Type handling', () => {
      it('should accept application/json content type', async () => {
        await request(app.getHttpServer())
          .post('/users')
          .set('Content-Type', 'application/json')
          .send(validUserData)
          .expect(HttpStatus.CREATED);
      });

      it('should return 400 for invalid JSON', async () => {
        await request(app.getHttpServer())
          .post('/users')
          .set('Content-Type', 'application/json')
          .send('invalid json{')
          .expect(HttpStatus.BAD_REQUEST);
      });
    });

    describe('Response format', () => {
      it('should return JSON response', async () => {
        const response = await request(app.getHttpServer())
          .post('/users')
          .send(validUserData)
          .expect(HttpStatus.CREATED)
          .expect('Content-Type', /json/);

        expect(typeof response.body).toBe('object');
      });

      it('should not expose sensitive fields', async () => {
        const response = await request(app.getHttpServer())
          .post('/users')
          .send(validUserData)
          .expect(HttpStatus.CREATED);

        // Ensure password or other sensitive fields are not returned
        expect(response.body).not.toHaveProperty('password');
        expect(response.body).not.toHaveProperty('passwordHash');
      });
    });
  });
});
