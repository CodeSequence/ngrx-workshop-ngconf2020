import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { UserComponent } from "./user.component";

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  declarations: [UserComponent],
  exports: [UserComponent]
})
export class UserComponentModule {}
