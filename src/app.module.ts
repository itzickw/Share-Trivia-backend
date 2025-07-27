import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsModule } from './topics/topics.module';
import { LevelsModule } from './levels/levels.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { ValidationService } from './common/validation/validation.service';
import { ValidationModule } from './common/validation/validation.module';
import { UserProgressModule } from './user-progress/user-progress.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env', // Path to the environment file
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'), // Use the DATABASE_URL from .env
        // host: configService.get<string>('DATABASE_HOST'),
        // port: configService.get<number>('DATABASE_PORT'),
        // username: configService.get<string>('DATABASE_USERNAME'),
        // password: configService.get<string>('DATABASE_PASSWORD'),
        // database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Adjust the path to your entities
        synchronize: true, // Set to true only in development; false in production
        logging: true, // Enable logging for debugging purposes
        // extra: {
        //   family: 4, // Use IPv4
        // },
      }),
      inject: [ConfigService], // Inject ConfigService to access environment variables
    }),
    TopicsModule,
    LevelsModule,
    QuestionsModule,
    AnswersModule,
    UserProgressModule,
    ValidationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ValidationService],
})
export class AppModule {}
