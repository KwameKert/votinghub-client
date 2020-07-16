import { NgModule } from '@angular/core';
import { RouterModule, Routes ,PreloadAllModules} from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {DefaultComponent} from './layouts/default/default.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {AuthGuard} from './auth.guard';

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
}

// {
//   path:'', 
//   component: DefaultComponent,
//   loadChildren: () => import('./modules/student/student.module')
//                      .then(m => m.StudentModule)
// },
//{path: "**", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
