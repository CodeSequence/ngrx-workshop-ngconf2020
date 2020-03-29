import { Injectable } from "@angular/core";
import { timer, Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import * as uuid from "uuid/v4";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  login(username: string, password: string) {
    if (password !== "password" || !username.trim()) {
      return throwError(new Error("Invalid username or password"));
    }

    return timer(750).pipe(
      map(() => {
        const user = { id: uuid(), username };

        localStorage.setItem("auth", JSON.stringify(user));

        return user;
      })
    );
  }

  getStatus(): Observable<null | UserModel> {
    return timer(750).pipe(
      map(() => {
        const userString = localStorage.getItem("auth");

        if (!userString) return null;

        return JSON.parse(userString);
      })
    );
  }

  logout() {
    localStorage.removeItem("auth");
  }
}
