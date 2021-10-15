import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

export interface IRequestUser extends Request {
  user: User;
}
