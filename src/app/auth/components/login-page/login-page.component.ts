import { Component } from "@angular/core";
import { Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import { UserModel } from "src/app/shared/models";
import { AuthUserActions } from "../../actions";
import { LoginEvent } from "../login-form";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent {
  gettingStatus$: Observable<boolean> = of(false);
  user$: Observable<UserModel | null> = of({
    id: "1",
    username: "NgRx Learner"
  });
  error$: Observable<string | null> = of(null);

  onLogin($event: LoginEvent) {
    // Not Implemented
  }
}
