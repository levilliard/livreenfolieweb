import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { DialogMsg } from 'src/app/shared/app-msg/dialog-msg.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public dialog: MatDialog,
  ) { }

  ngOnInit() { }

  // showMsg(): void {
  //   const dialogRef = this.dialog.open(DialogMsg, {
  //     width: '250px',
  //     data: { msg: 'Oops ! Nous travailler sur une petite mise à jour. Merci de compteer, le temps de revenir vers vous !' }
  //   });
  // }

  logOut(){
    this.authService.SignOut();
  }
}
