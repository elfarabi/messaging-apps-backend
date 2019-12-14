import * as userService from './userService';

describe('User Service', () => {

  test('Should success create user', async () => {
    const body = {
      name: "mockUser1",
      email: "mockUser1@email.com",
      password: "mockUser1"
    };

    const create = await userService.createUser(body);
    const result = {
      success: true,
      message: "Success create account"
    };
    expect(create).toEqual(result);
  });

  test('Should success login user', async () => {
    const body = {
      email: "mockUser1@email.com",
      password: "mockUser1"
    };

    const create = await userService.loginUser(body);
    expect(create).toHaveBeenCalled(1);
  });

  test('Should fail login user', async () => {
    const body = {
      email: "mockUser1@email.com",
      password: "mockUser12345"
    };

    const create = await userService.loginUser();
    expect(create).toHaveBeenCalled();
  });
});
