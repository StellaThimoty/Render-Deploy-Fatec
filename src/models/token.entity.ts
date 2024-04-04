import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import User from './user.entity'

@Entity()
export default class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  userId!: number

  @Column()
  token!: string

  @Column()
  refreshToken!: string

  @Column()
  expiresAt!: Date  

  @ManyToOne(() => User, user => user.tokens)
  user!: User
}