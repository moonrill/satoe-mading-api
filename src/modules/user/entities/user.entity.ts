import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Role } from 'src/modules/role/entities/role.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamptz' })
  deletedAt: Date;

  /**
   * Hashes the user's password before saving it to the database.
   * This method is called automatically by TypeORM before the user is inserted into the database.
   *
   * @returns {Promise<void>} - A promise that resolves when the password has been hashed.
   */
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    // Check if the password is not null or undefined
    if (!this.password) {
      return;
    }

    // Hash the password with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
  }
}
