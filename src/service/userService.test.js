import * as userService from './userService';

describe('User Service', () => {
  test('Should create user', async () => {
    const body = {
      name: "mockUser",
      email: "mockUser@email.com",
      password: "mockUser"
    };

    const create = await userService.createUser(body);
    const result = {
      success: true,
      message: "Success create account"
    };
    expect(create).toEqual(result);
  });
});
