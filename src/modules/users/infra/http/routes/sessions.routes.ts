import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

interface UserWithoutPassword {
  email:string
  password?: string
}

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
     const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user , token }: { user: UserWithoutPassword, token: string } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
