import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from '../permission/permission.module';
import { User } from '../user/entities/user.entity';
import { Role } from './entities/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User]), PermissionModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
