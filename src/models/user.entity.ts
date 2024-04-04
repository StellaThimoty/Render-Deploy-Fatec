import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import Token from './token.entity'
import Task from './task.entity'
import Profile from './profile.entity'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @OneToMany(() => Token, token => token.user)
  tokens!: Token[]

  @OneToMany(() => Task, task => task.user)
  tasks!: Task[]

  // @OneToOne(() => Profile, profile => profile.user)
  // profile?: Profile
}