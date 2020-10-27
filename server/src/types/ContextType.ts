import { Response, Request } from "express";
export type ContextType = {
  res: Response;
  req: Request;
};
