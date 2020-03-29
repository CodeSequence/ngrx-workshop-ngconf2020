import { createAction } from "@ngrx/store";
import { UserModel } from "src/app/shared/models";

export const getAuthStatusSuccess = createAction(
  "[Auth/API] Get Auth Status Success",
  (user: UserModel | null) => ({ user })
);

export const loginSuccess = createAction(
  "[Auth/API] Login Success",
  (user: UserModel) => ({ user })
);

export const loginFailure = createAction(
  "[Auth/API] Login Failure",
  (reason: string) => ({ reason })
);
