import { AuthChecker } from "type-graphql";
import { ContextType } from "../types/ContextType";

// { root, args, context, info }, roles
// Ce sont les parametres
export const autenticationChecker: AuthChecker<ContextType> = () => {
  return true;
};
