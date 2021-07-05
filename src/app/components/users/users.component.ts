import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config, User } from 'src/app/models/models';
import { AppSettings } from 'src/app/providers/app-settings';
import { FirebaseService } from 'src/app/providers/firebaseService';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User = new User();

  constructor(
    private fService: FirebaseService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.user = AppSettings.DEFAULT_USER;
    console.log(" result profile: ", this.user);
  }

  initPays(){
  }

  redirectTo(param){
    this.router.navigate(['/dashboard/' + param])
  }
}
