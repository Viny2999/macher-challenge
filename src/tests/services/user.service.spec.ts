import { UserService } from '../../services/user.service';
import { UserRepositoryMock } from '../mocks/user.repository.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepositoryMock;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    userService = new UserService(userRepository);
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ id: '1', name: 'John Doe' }, { id: '2', name: 'Jane Smith' }];
      jest.spyOn(userRepository, 'findAll').mockResolvedValue(users);

      const result = await userService.findAll();

      expect(result).toEqual(users);
      expect(userRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { id: '1', name: 'John Doe' };
      jest.spyOn(userRepository, 'getUserById').mockResolvedValue(user);

      const result = await userService.findOne('1');

      expect(result).toEqual(user);
      expect(userRepository.getUserById).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userId = 1;
      const user = {
        cpf: '',
        name: 'John Doe',
        birth_date: new Date(),
        street: '',
        house_number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zip_code: '',
      }
      const createdUser = { 
        id: '1',
        cpf: '',
        name: 'John Doe',
        birth_date: new Date(),
        street: '',
        house_number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zip_code: '',
        created_at: new Date(),
        created_by: userId
      };
      jest.spyOn(userRepository, 'createUser').mockResolvedValue(createdUser);

      const result = await userService.create(userId, user);

      expect(result).toEqual(createdUser);
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const userId = 1;
      const id = '1';
      const partialUser = { name: 'John Smith' };
      const updatedUser = { id: '1', name: 'John Smith', updated_at: new Date(), updated_by: userId };
      jest.spyOn(userRepository, 'updateUser').mockResolvedValue(updatedUser);

      const result = await userService.update(id, userId, partialUser);

      console.log('it :: result:', result);
      console.log('it :: updatedUser:', updatedUser);

      expect(result).toEqual(updatedUser);
    });
  });

  describe('delete', () => {
    it('should delete a user by id', async () => {
      const userId = 1;
      const id = '1';
      const deletedUser = { id: '1', name: 'John Smith', deleted_at: new Date(), deleted_by: userId };
      jest.spyOn(userRepository, 'updateUser').mockResolvedValue(deletedUser);

      const result = await userService.delete(id, userId);

      expect(result).toEqual(deletedUser);
    });
  });
});
