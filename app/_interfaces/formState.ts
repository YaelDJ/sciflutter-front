import { LoggedUser } from "./api";

export interface FormState {
  success: boolean,
  message?: string,
  user?: LoggedUser
}