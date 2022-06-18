import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.model';
import { Role } from '../roles/roles.model';
import { UserRole } from './UserRole.model';
import { RolesModule } from '../roles/roles.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [SequelizeModule.forFeature([User, Role, UserRole]), RolesModule],
})
export class UserModule {}
