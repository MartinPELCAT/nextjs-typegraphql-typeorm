import { Arg, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions/decorators/InjectRepository";
import { User } from "../entity/User";

@Resolver()
export default class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Query(() => [User])
  async user(
    @Arg("userId", () => String)
    userId: string
  ): Promise<User[]> {
    console.log("UserId: ", userId);
    return this.userRepository.find();
  }

  @Query(() => [User])
  async users() {
    return [];
  }
}
