import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GenericProvider } from 'src/app/providers/generic';
import { AppSettings } from 'src/app/providers/app-settings';
import { User } from 'src/app/models/models';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  isLogin = false;

  constructor(
    public gProvider: GenericProvider,
    public router: Router,
    public authService: AuthService,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }

  ngOnInit() { }

  signGIn(){
    //this.authService.GoogleAuth().then;
  }

  signIn(username, password){
    this.isLogin = true;

    this.gProvider.login("/users/login", username, password).subscribe(data=>{
      console.log("user login: ", data);
      if(data != null){
        let user = <User>data;
        AppSettings.DEFAULT_USER = user;
        this.ngZone.run(() => {
          this.router.navigate(['dashboard/users']);
        });
      }
      this.isLogin = false;
    }, error=>{
      window.alert(error.message)
      this.isLogin = false;
    })
  }

 
}