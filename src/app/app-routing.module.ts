import { NgModule } from '@angular/core';
import { RouterModule, Routes ,PreloadAllModules} from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {DefaultComponent} from './layouts/default/default.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {  VotingLayoutComponent } from './layouts/voting-layout/voting-layout.component';
import {AuthGuard} from './auth.guard';
import { ErrorPageComponent } from './modules/voting/components/error-page/error-page.component';

const routes: Routes= [
{
  path:'', 
  component: AuthLayoutComponent,
  loadChildren: () => import('./modules/authentication/authentication.module')
                     .then(m => m.AuthenticationModule)
},

{
  path:'admin', 
  canActivate: [AuthGuard],
  component: AdminLayoutComponent,
  loadChildren: () => import('./modules/admin/admin.module')
                     .then(m => m.AdminModule)
},
{
  path:'htau', 
  component: VotingLayoutComponent,
  loadChildren: () => import('./modules/voting/voting.module')
                     .then(m => m.VotingModule)
},
{
  path: '**',
  component: ErrorPageComponent
}
// {
//   path:'**', 
//   component: ErrorPageComponent
// }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
