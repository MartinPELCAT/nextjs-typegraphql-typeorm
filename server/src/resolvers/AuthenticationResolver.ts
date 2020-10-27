import { compare, hash } from "bcrypt";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entity/User";
import { SignInInput, SignUpInput } from "../inputs/User";
import { ContextType } from "../types/ContextType";
import { sign, verify } from "jsonwebtoken";

@Resolver()
export default class AuthenticationResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Mutation(() => User)
  async signUp(
    @Arg("user") { firstName, lastName, password, username }: SignUpInput
  ): Promise<User> {
    const encryptedPassword = await hash(password, 4);
    const user = this.userRepository.create({
      token: sign(
        { lastName, firstName, date: Date.now(), username },
        process.env.JWT_SECRET
      ),
      firstName,
      lastName,
      password: encryptedPassword,
      username,
    });
    return await user.save();
  }

  @Query(() => User)
  async signIn(
    @Arg("user") { password, username }: SignInInput,
    @Ctx() { res }: ContextType
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      const match = await compare(password, user.password);
      if (match) {
        res.cookie("_token", user.token, { signed: true });
        return user;
      }
      throw new Error("No user found");
    } else {
      throw new Error("No user found");
    }
  }

  @Query(() => User, { nullable: true })
  async getCurrentUser(@Ctx() { req }: ContextType) {
    const token = req.signedCookies["_token"];
    if (!token) return null;
    try {
      verify(token, process.env.JWT_SECRET);
      //TODO: Voir si il faut faire un truc ici
    } catch (error) {
      return null;
    }
    return await this.userRepository.findOne({
      where: { token },
    });
  }
}
