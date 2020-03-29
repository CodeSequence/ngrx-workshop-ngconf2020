import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { LoginPageComponentModule } from "./components/login-page";
import { UserComponentModule } from "./components/user";

@NgModule({
  exports: [LoginPageComponentModule, UserComponentModule]
})
export class AuthModule {}
