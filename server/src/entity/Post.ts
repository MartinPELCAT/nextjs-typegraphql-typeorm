import { Field, ObjectType } from "type-graphql";
import { Entity, ManyToOne, TableInheritance } from "typeorm";
import AbstractBaseEntity from "./AbstractBaseEntity";
import { User } from "./User";

@Entity()
@ObjectType()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Post extends AbstractBaseEntity {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
