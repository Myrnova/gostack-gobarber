import { Router } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';

const usersRouter = Router();

interface UserWithoutPassword {
  email:string
  password?: string
}

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user: UserWithoutPassword = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
