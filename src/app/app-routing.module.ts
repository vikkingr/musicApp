import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlayerComponent } from "./pages/player/player.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { UploadComponent } from "./pages/upload/upload.component";

const routes: Routes = [
  { path: "", component: PlayerComponent },
  { path: "profile", component: ProfileComponent },
  { path: "upload", component: UploadComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
