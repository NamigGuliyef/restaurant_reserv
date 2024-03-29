import { User } from 'src/user/model/user.schema';

export class tokenReqType extends Request {
  user: User;
}
