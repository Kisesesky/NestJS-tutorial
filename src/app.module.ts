import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './ormconfig';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { WinstonLoggerModule } from './modules/logger/winston-loggers.module';




@Module({
  imports: [
  ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    UsersModule,
    AuthModule,
    PostsModule,
    WinstonLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
