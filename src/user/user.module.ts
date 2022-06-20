import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.model';
import { Role } from '../roles/roles.model';
import { UserRole } from './UserRole.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { Board } from '../board/board.model';
import { UserBoard } from '../board/UserBoard.model';
import { BoardModule } from '../board/board.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRole, Board, UserBoard]),
    RolesModule,
    BoardModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
