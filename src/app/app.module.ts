import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Reactive Form
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';

// App components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Auth service
import { AuthService } from "./shared/services/auth.service";
import { ResultatComponent } from './components/resultat/resultat.component';
import { UsersComponent } from './components/users/users.component';
import { CommonModule, DatePipe } from '@angular/common';


import { MatMenuModule } from '@angular/material/menu'
import { MatGridListModule } from '@angular/material/grid-list'    
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field' 
import { MatInputModule } from '@angular/material/input'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatRadioModule } from '@angular/material/radio'
import { AppMsgModule } from './shared/app-msg/app-msg.module'
import { GenericProvider } from './providers/generic';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseService } from './providers/firebaseService';
import { CompteComponent } from './components/compte/compte.component';
import { DialogUserUpdateDialog, UserComponent } from './components/user/user.component';
import { CompteCrudComponent } from './components/compte/compte-crud/compte-crud.component';
import { CompteViewComponent } from './components/compte/compte-view/compte-view.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { LivreCrudComponent } from './components/livre/livre-crud/livre-crud.component';
import { LivreViewComponent } from './components/livre/livre-view/livre-view.component';
import { LivreComponent } from './components/livre/livre.component';
import { OperationCrudComponent } from './components/operation/operation-crud/operation-crud.component';
import { OperationViewComponent } from './components/operation/operation-view/operation-view.component';
import { OperationComponent } from './components/operation/operation.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ResultatComponent,
    UsersComponent,
    UserComponent,
    DialogUserUpdateDialog,
    CompteComponent, 
    CompteViewComponent, 
    CompteCrudComponent,
    OperationComponent, 
    OperationViewComponent, 
    OperationCrudComponent,
    LivreComponent, 
    LivreViewComponent, 
    LivreCrudComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatRadioModule,
    MatPaginatorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule, 
    MatMenuModule,
    MatGridListModule,    
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    AppMsgModule,
    FormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatNativeDateModule,
    MatGridListModule,
    MatInputModule,
    MatOptionModule,
  ],
  providers: [GenericProvider, DatePipe, FirebaseService],
  bootstrap: [AppComponent]
})

export class AppModule { }