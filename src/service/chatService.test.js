import * as chatService from './chatService';

describe('Chat Service', () => {

  test('Should success send message', async () => {
    const body = {
      userId: "mockUser1@email.com",
      content: "mock content"
    };

    const test = await chatService.sendMessage(body);
    const result = {
      success: true,
      message: "Success create account"
    };
    expect(test).toEqual(result);
  });

  test('Should Get All Message', async () => {
    const body = {
      userId: "mockUser1@email.com"
    };

    const test = await chatService.getConversation(body);
    expect(test).toHaveBeenCalled(1);
  });

  test('Should Get Last Message', async () => {
    const test = await chatService.lastMessage();
    expect(test).toHaveBeenCalled();
  });
});
