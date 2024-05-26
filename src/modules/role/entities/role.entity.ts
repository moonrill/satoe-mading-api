import { Permission } from 'src/modules/permission/entities/permission.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    eager: true,
  })
  @JoinTable({ name: 'role_permission' })
  permissions: Permission[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
