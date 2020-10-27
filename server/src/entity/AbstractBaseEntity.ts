import { Field, ObjectType } from "type-graphql";
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@ObjectType()
export default abstract class AbstractBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  _id: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @DeleteDateColumn()
  @Field()
  deletedAt: Date;
}
