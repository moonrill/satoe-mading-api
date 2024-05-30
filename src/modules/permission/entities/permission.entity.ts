import { Role } from 'src/modules/role/entities/role.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  url: string; // URL pattern (e.g., '/profile', '/user/:id')

  @Column({ nullable: false, length: 10 })
  method: string; // HTTP method (e.g., 'GET', 'POST')

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
