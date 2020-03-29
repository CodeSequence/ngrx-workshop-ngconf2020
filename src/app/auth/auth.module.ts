import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { LoginPageComponentModule } from "./components/login-page";
import { UserComponentModule } from "./components/user";
import { AuthEffects } from "./auth.effects";

@NgModule({
  imports: [EffectsModule.forFeature([AuthEffects])],
  exports: [LoginPageComponentModule, UserComponentModule]
})
export class AuthModule {}
