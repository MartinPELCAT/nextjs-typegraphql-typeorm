import { Field, ObjectType } from "type-graphql";
import { Entity, Column, OneToMany } from "typeorm";
import AbstractBaseEntity from "./AbstractBaseEntity";
import { Post } from "./Post";

@Entity()
@ObjectType({ description: "General database" })
export class User extends AbstractBaseEntity {
  @Column()
  @Field()
  firstName!: string;

  @Column()
  @Field()
  lastName!: string;

  @Column()
  @Field()
  username!: string;

  @Column()
  password!: string;

  @Column()
  token: string;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.author, {
    lazy: true,
    cascade: ["insert"],
  })
  posts: Post[];
}
