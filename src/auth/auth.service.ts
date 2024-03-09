import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    console.log('login ', email, password);
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = password == user.password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email and password');
    }

    return { accessToken: this.jwtService.sign({ userId: user.id }) };
  }

  async register(email: string, password: string): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (user) {
      throw new BadRequestException('User alreay exist');
    }

    await this.prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });
    return 'User created successfully';
  }
}
