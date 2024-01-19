import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthService } from '../../services/auth.service';
import { AuthRepositoryMock } from '../mocks/auth.repository.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let authRepository: AuthRepositoryMock;

  beforeEach(() => {
    authRepository = new AuthRepositoryMock();
    authService = new AuthService(authRepository);
  });

  describe('login', () => {
    it('should return success', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const user = { id: 1, username, password: bcrypt.hashSync(password, 10) };
      jest.spyOn(authRepository, 'findByUsername').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
      jest.spyOn(jwt, 'sign').mockReturnValueOnce();

      await authService.login(username, password);

      expect(authRepository.findByUsername).toHaveBeenCalledWith(username);
      expect(bcrypt.compareSync).toHaveBeenCalledWith(password, user.password);
      expect(jwt.sign).toHaveBeenCalledWith({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    });

    it('should return failure and an error message if the username is correct but the password is invalid', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const user = { id: 1, username, password: bcrypt.hashSync('differentpassword', 10) };
      jest.spyOn(authRepository, 'findByUsername').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

      const result = await authService.login(username, password);

      expect(result).toEqual({
        success: false,
        message: 'Invalid password',
      });
      expect(authRepository.findByUsername).toHaveBeenCalledWith(username);
      expect(bcrypt.compareSync).toHaveBeenCalledWith(password, user.password);
    });

    it('should return failure and an error message if the username does not exist', async () => {
      const username = 'nonexistentuser';
      const password = 'testpassword';
      jest.spyOn(authRepository, 'findByUsername').mockResolvedValue(null);

      const result = await authService.login(username, password);

      expect(result).toEqual({
        success: false,
        message: 'User doesn\'t exist',
      });
      expect(authRepository.findByUsername).toHaveBeenCalledWith(username);
    });
  });
});
