import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInDTO,
  SignUpDTO,
  UserDTO,
  UpdateUsernameDTO,
  ChangeUserRoleDTO,
  BlockUserDTO,
} from './dto/auth.dto';

import { Public } from './decorators/public.decorator';
import { Admin } from './decorators/admin.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  @ApiOperation({ summary: 'Register a new user' })
  @ZodResponse({ status: 201, type: UserDTO })
  async signUp(@Body() signUpDto: SignUpDTO) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('sign-in')
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({ status: 200, description: 'User successfully authenticated' })
  async signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto);
  }

  @Patch('update-username')
  @ApiOperation({ summary: 'Update current user username' })
  @ZodResponse({ status: 200, type: UserDTO })
  async updateUsername(
    @CurrentUser() user: { sub: string },
    @Body() updateUsernameDto: UpdateUsernameDTO,
  ) {
    return await this.authService.updateUsername(user.sub, updateUsernameDto);
  }

  @Admin()
  @Patch('change-role')
  @ApiOperation({ summary: 'Change user role (Admin only)' })
  @ZodResponse({ status: 200, type: UserDTO })
  async changeUserRole(@Body() changeUserRoleDto: ChangeUserRoleDTO) {
    return await this.authService.changeUserRole(changeUserRoleDto);
  }

  @Admin()
  @Patch('block-user')
  @ApiOperation({ summary: 'Block or unblock user (Admin only)' })
  @ZodResponse({ status: 200, type: UserDTO })
  async blockUser(@Body() blockUserDto: BlockUserDTO) {
    return await this.authService.blockUser(blockUserDto);
  }
}
