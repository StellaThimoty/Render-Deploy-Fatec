import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import User from './user.entity'
import Gender from '../types/gender.type'

@Entity()
export default class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    userId!: number

    @Column({nullable: true})
    age?: number

    @Column({nullable: true})
    gender?: Gender

    @Column({nullable: true})
    picture?: string

    @Column({nullable: true})
    bio?: string

    @OneToOne(() => User)
    @JoinColumn()
    user!: User
}