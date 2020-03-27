import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { SignInComponent } from '../auth/sign-in/sign-in.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: 'signin',
    component: SignInComponent,
    pathMatch: 'full',
  },
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module')
    .then( m => m.HomePageModule)
  },
  { 
    path: 'forgotPassword', 
    component: ForgotPasswordComponent, 
    pathMatch: 'full'
  },  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
