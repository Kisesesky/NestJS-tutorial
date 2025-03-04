import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(()=>User, (user)=>user.posts)
    user: User

    @CreateDateColumn()
    createdAt: Date;
}
