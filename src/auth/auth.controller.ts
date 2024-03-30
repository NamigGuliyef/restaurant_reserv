import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { createUserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { messageResponse, tokenResponse, userSignIn } from './auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // istifadəçi qeydiyyatı
  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async signUp(@Body() CreateUserDto: createUserDto): Promise<messageResponse> {
    return await this.authService.signUp(CreateUserDto)
  }


  // istifadəçi girişi
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async singIn(@Body() UserSignIn: userSignIn): Promise<tokenResponse> {
    return await this.authService.signIn(UserSignIn)
  }


  
}
