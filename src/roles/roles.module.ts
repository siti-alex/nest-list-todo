import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { User } from '../user/entity/user.model';
import { UserRole } from '../user/UserRole.model';
import { Role } from './roles.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([User, UserRole, Role])],
  exports: [RolesService],
})
export class RolesModule {}
