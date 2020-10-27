import { Field, InputType } from "type-graphql";
import { User } from "../entity/User";

@InputType()
export class SignUpInput implements Partial<User> {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field()
  username: string;
}

@InputType()
export class SignInInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  password: string;
}
