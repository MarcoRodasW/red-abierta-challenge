import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/services/prisma.service';
import {
  SignUp,
  SignIn,
  UpdateUsername,
  ChangeUserRole,
  BlockUser,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUp) {
    const { username, password } = signUpDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if this is the first user in the database
    const userCount = await this.prisma.user.count();
    const isFirstUser = userCount === 0;

    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: isFirstUser ? 'ADMIN' : 'USER',
        isActive: true,
      },
      select: {
        id: true,
        username: true,
        role: true,
        isActive: true,
      },
    });

    return user;
  }

  async signIn(signInDto: SignIn) {
    const { username, password } = signInDto;

    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        role: true,
        isActive: true,
      },
    });

    return user;
  }

  async updateUsername(userId: string, updateUsernameDto: UpdateUsername) {
    const { username } = updateUsernameDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUser && existingUser.id !== userId) {
      throw new ConflictException('Username already exists');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { username },
      select: {
        id: true,
        username: true,
        role: true,
        isActive: true,
      },
    });

    return updatedUser;
  }

  async changeUserRole(changeUserRoleDto: ChangeUserRole) {
    const { userId, role } = changeUserRoleDto;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        username: true,
        role: true,
        isActive: true,
      },
    });

    return updatedUser;
  }

  async blockUser(blockUserDto: BlockUser) {
    const { userId, isActive } = blockUserDto;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === 'ADMIN') {
      throw new ForbiddenException('Cannot block admin users');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { isActive },
      select: {
        id: true,
        username: true,
        role: true,
        isActive: true,
      },
    });

    return updatedUser;
  }
}
