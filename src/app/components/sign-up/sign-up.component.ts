import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Adress, User } from 'src/app/models/models';
import { AppSettings } from 'src/app/providers/app-settings';
import { GenericProvider } from 'src/app/providers/generic';
import { DialogMsg } from 'src/app/shared/app-msg/dialog-msg.component';
import { AuthService } from "../../shared/services/auth.service";
import { DialogUserUpdateDialog } from '../user/user.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

	user: User;

	UserForm: FormGroup;
	isDelete: boolean;
	isDetails: boolean;
	currentSite: string;
	currentClinic: string;
	DEFAULT_USER: User;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
    private dialog: MatDialog,
		private gProvider: GenericProvider) {

		this.UserForm = this.formBuilder.group({
			/* user form */
			firstName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
			lastName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
			login: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
			password: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(140), Validators.required])],
			email: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(50), Validators.required])],
			numero: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(50), Validators.required])],
			rue: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
			ville: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(100), Validators.required])],
			codePostal: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(50), Validators.required])],
		});
  }
  
  ngOnInit() { }

  onClickSave(){
    let obj: User = new User();
		//------------------------------------------------------------------------------------------------
		obj.login = this.UserForm.value.login;
		obj.firstName = this.UserForm.value.firstName;
		obj.lastName = this.UserForm.value.lastName;
		obj.password = this.UserForm.value.password;
		obj.image = this.UserForm.value.image;

		obj.adress = new Adress();
		obj.adress.codePostal = this.UserForm.value.codePostal;
		obj.adress.rue = this.UserForm.value.rue;
		obj.adress.ville = this.UserForm.value.ville;
		obj.adress.numero = this.UserForm.value.numero;
		///obj.createdBy = this.DEFAULT_USER.userUsername;
		let dv = new Date().toISOString();

    obj.createdDate = dv;
		
			
    //obj.userActive = false;
    this.gProvider.addObject(obj, "/users").subscribe(data => {
      console.log("add user: ", obj);
      this.showMsg("Success ! Account activation is pending. An admin will activate it for you.")
    }, error => {
      let msg = error["error"]["message"];
      if (msg == null || msg.length < 4) {
        msg = "Can't connect to the server. ";
        this.showMsg(msg)
      }
    });
  }

  showMsg(msg: string): void {
		const dialogRef = this.dialog.open(DialogMsg, {
			width: '350px',
			data: { msg: msg }
		});
	}

}