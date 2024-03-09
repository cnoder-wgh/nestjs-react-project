import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { AuthController } from './auth.controller';
import { RedisCacheModule } from 'src/core/redis/redis-cache.module';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      useFactory: (config: ConfigType<typeof jwtConfig>) => {
        return {
          secret: config.secretKey,
          signOptions: { expiresIn: config.expiresIn },
        } as JwtModuleOptions;
      },
      inject: [jwtConfig.KEY],
    }),
    RedisCacheModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
