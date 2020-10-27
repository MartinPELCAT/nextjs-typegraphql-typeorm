import { ChildEntity, Column } from "typeorm";
import { Post } from "./Post";

@ChildEntity()
export class Article extends Post {
  @Column({ type: "text" })
  content: string;
}
