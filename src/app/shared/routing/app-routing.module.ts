import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';

import { AuthGuard } from "../../shared/guard/auth.guard";
import { UsersComponent } from 'src/app/components/users/users.component'; 
import { ResultatComponent } from 'src/app/components/resultat/resultat.component';
import { CompteComponent } from 'src/app/components/compte/compte.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { LivreComponent } from 'src/app/components/livre/livre.component';
import { OperationComponent } from 'src/app/components/operation/operation.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'compte', component: CompteComponent },
      { path: 'livre', component: LivreComponent },
      { path: 'operation', component: OperationComponent },
      { path: 'user', component: UserComponent },
      { path: 'users', component: UsersComponent },
    ],
    //canActivate: [AuthGuard]
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent }
]
  

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
