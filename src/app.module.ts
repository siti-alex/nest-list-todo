import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRole } from './user/UserRole.model';
import { BoardModule } from './board/board.module';
import { UserBoard } from './board/UserBoard.model';
import { Board } from './board/board.model';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      // entities: [User],
      models: [User, Role, Board, UserRole, UserBoard],
      logging: true,
      synchronize: true,
      autoLoadModels: true,
    }),
    RolesModule,
    BoardModule,
  ],
})
export class AppModule {}
