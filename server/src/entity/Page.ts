import { ChildEntity, Column } from "typeorm";
import { Post } from "./Post";

@ChildEntity()
export class Page extends Post {
  @Column({ type: "text" })
  content: string;

  @Column({ type: "boolean" })
  isHome: boolean;
}
