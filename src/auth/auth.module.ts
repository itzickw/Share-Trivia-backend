import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [        
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('SUPABASE_JWT_SECRET'),
                signOptions: { expiresIn: '1h' }, 
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [JwtStrategy],
    exports: [PassportModule, JwtModule],
})
export class AuthModule {}
