import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RegisterDto } from './user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getUser', () => {
    it('should return a user by id', async () => {
      const userId = 1;
      const withItems = false;
      const user = {
        id: 1,
        username: 'aaa',
        email: 'aaa@qq.com',
      }; // Replace with a user object for testing

      jest.spyOn(userService, 'findById').mockResolvedValue(user);

      const result = await userController.getUser(userId, withItems);

      expect(result).toBe(user);
      expect(userService.findById).toHaveBeenCalledWith(userId, withItems);
    });
  });

  describe('register', () => {
    it('should register a user', async () => {
      const registerDto: RegisterDto = {
        username: 'aaa',
        email: 'aa@qq.com',
        password: '1111',
      }; // Replace with a valid registerDto object for testing

      jest.spyOn(userService, 'register').mockResolvedValue({ id: 1 });

      const result = await userController.register(registerDto);

      expect(result).toBe(registerDto);
      expect(userService.register).toHaveBeenCalledWith(registerDto);
    });
  });
});
