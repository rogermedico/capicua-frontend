import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LogoutGuard } from '@guards/logout.guard';
import { ConfigurationComponent } from './components/configuration/configuration.component';

const routes: Routes = [
  { path: '', component: ConfigurationComponent, canActivate: [LogoutGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
