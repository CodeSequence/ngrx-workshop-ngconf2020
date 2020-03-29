import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, concatMap, catchError, tap } from "rxjs/operators";
import { AuthService } from "../shared/services/auth.service";
import { AuthApiActions, AuthUserActions } from "./actions";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private auth: AuthService) {}

  getAuthStatus$ = createEffect(() =>
    this.auth
      .getStatus()
      .pipe(map(userOrNull => AuthApiActions.getAuthStatusSuccess(userOrNull)))
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthUserActions.login),
      concatMap(action => {
        return this.auth.login(action.username, action.password).pipe(
          map(user => AuthApiActions.loginSuccess(user)),
          catchError(reason => of(AuthApiActions.loginFailure(reason)))
        );
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthUserActions.logout),
        tap(() => this.auth.logout())
      ),
    { dispatch: false }
  );
}
