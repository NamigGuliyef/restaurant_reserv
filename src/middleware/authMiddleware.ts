import {
    HttpException,
    HttpStatus,
    NestMiddleware
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { jwtSecret } from 'src/config/jwtSecret';
import { User } from 'src/user/model/user.schema';


// istifadəçi üçün auth middleware
export class userAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new HttpException('Token yoxdur', HttpStatus.NOT_FOUND);
    verify(token, jwtSecret, (err: any, user:User) => {
      if (err) {
        throw new HttpException('Token yalnisdir', HttpStatus.FORBIDDEN);
      } else if (user.role!== 'user') {
        throw new HttpException('Sən istifadəçi deyilsən.', HttpStatus.FORBIDDEN);
      } else {
        req.user = user
        next()
      }
    });
  }
}


// admin üçün auth middleware
export class adminAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new HttpException('Token yoxdur', HttpStatus.NOT_FOUND);
    verify(token, jwtSecret, (err: any, admin:User) => {
      if (err) {
        throw new HttpException('Token yalnisdir', HttpStatus.FORBIDDEN);
      } else if (admin.role!== 'admin') {
        throw new HttpException('Sən admin deyilsən.', HttpStatus.FORBIDDEN);
      } else {
        req.admin = admin
        next()
      }
    });
  }
}



