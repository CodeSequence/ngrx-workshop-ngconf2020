import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { LoginFormComponent } from "./login-form.component";

@NgModule({
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class LoginFormComponentModule {}
