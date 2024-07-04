import { User } from '../../user/entities/user.entity';
export interface UserType {
  user: User;
  accessToken: string;
  refreshToken: string;
}
