

import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Adress, User } from 'src/app/models/models';
import { GenericProvider } from 'src/app/providers/generic';
import { AppSettings } from 'src/app/providers/app-settings';
import { DialogMsg } from 'src/app/shared/app-msg/dialog-msg.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	users: Array<User>;
	_users: Array<User>;
	defaultUser: User;
	eUser = new User();
	isNotRoot = false;
	range: string;

	constructor(private gProvider: GenericProvider, public dialog: MatDialog) {
		this.defaultUser = JSON.parse(localStorage.getItem("USER"));
		if(this.defaultUser != null){
			this.eUser.image = this.defaultUser.image;
		}
		this.users = [];
		this._users = [];
		// this.users.push(AppSettings.DEFAULT_USER);
		// this._users.push(AppSettings.DEFAULT_USER);
		this.fetchData();
		console.log('user', this.defaultUser);
	
	}

	fetchData(): void {
		this.gProvider.getArrayOfObject("/users").subscribe(data => {
			console.log("class found: ", data);
			this.users = <Array<User>>data;
			this._users = <Array<User>>data;
		}, error => {
			console.log("users errors: ", error);
		});
	}

	onSearchChange(val: string){
		if(val.length == 0){
			this.users = this._users.slice();
			return;
		}

		this.users = [];
		this._users.forEach(u=>{
			if((u.login + u.lastName + u.firstName).toLowerCase().includes(val.toLowerCase())){
				this.users.push(u);
			}
		})
	}

	ngOnInit() {

	}

	activate(user: User) {
		//user.userActive = true;
		console.log("update user success: ", user);

		this.gProvider.updateObject(user, "/users").subscribe(data => {
			console.log("update user success: ", data);
		}, error => {
			console.log("update user error: ", error);
		});
	}

	openDialog(data, param, w, h): void {
		data.param = param;

		// if ("Update" == param) {
		// 	this.showMsg("Attention ! Si vous modifier un utilisateur, vous devez modifier son mot de passe aussi.");
		// }

		let dialogRef = this.dialog.open(DialogUserUpdateDialog, {
			width: w,
			height: h,
			data: data
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.fetchData();
		});
	}

	showMsg(msg: string): void {
		const dialogRef = this.dialog.open(DialogMsg, {
			width: '450px',
			data: { msg: msg }
		});
	}

}

@Component({
	selector: 'user-update-dialog',
	templateUrl: 'user-update.component.html',
	styleUrls: ['./user.component.css'],
	providers: [GenericProvider]
})
export class DialogUserUpdateDialog {
	user: User;

	UserForm: FormGroup;
	isDelete: boolean;
	isDetails: boolean;
	currentSite: string;
	currentClinic: string;
	DEFAULT_USER: User;

	constructor(
		private dialog: MatDialog,
		public dialogRef: MatDialogRef<DialogUserUpdateDialog>,
		private router: Router,
		private formBuilder: FormBuilder,
		private gProvider: GenericProvider,
		@Inject(MAT_DIALOG_DATA) public data: any) {

		this.isDelete = (this.data.param == "Delete" || this.data.param == "Details");
		this.isDetails = this.data.param == "Details";
		this.user = <User>this.data;
		if(this.user.adress == null){
			this.user.adress = new Adress();
		}
		this.user.image = AppSettings.DEFAULT_USER.image;

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

		if (this.data.param == "Update" || this.isDelete){
			console.log("Data User: ", this.data);
			this.UserForm.patchValue({"firstName": this.data.firstName, "lastName": this.data.lastName, "login": this.data.login, "email": this.data.email, "password": this.data.password, "numero": this.data.adress.numero, "rue": this.data.adress.rue,"ville": this.data.adress.ville,"codePostal": this.data.adress.codePostal});
		}else if (this.data.param == "Add") {
			this.UserForm.setValue({"firstName": "", "lastName": "", "login": "", "email": "", "password": "", "numero": "", "rue": "","ville": "","codePostal": ""});
		}else if (this.data.param == "Details") {
			this.UserForm.patchValue({"firstName": this.data.firstName, "lastName": this.data.lastName, "login": this.data.login, "email": this.data.email, "password": this.data.password,"numero": this.data.adress.numero, "rue": this.data.adress.rue,"ville": this.data.adress.ville,"codePostal": this.data.adress.codePostal});
		}

		this.DEFAULT_USER =  JSON.parse(localStorage.getItem("USER"));

		if(this.DEFAULT_USER == null){
			this.DEFAULT_USER = AppSettings.DEFAULT_USER;
		}
	}




	public onChangeClinic(val: string) {
		this.currentClinic = val;

		if (this.currentSite == null || this.currentSite.length == 0) {
			return
		}
	}

	onClickSave(): void {

		let obj: User = new User();
		//------------------------------------------------------------------------------------------------
		obj.login = this.UserForm.value.login;
		obj.firstName = this.UserForm.value.firstName;
		obj.lastName = this.UserForm.value.lastName;
		obj.password = this.UserForm.value.password;
		obj.numero = this.UserForm.value.numero;
		obj.image = this.UserForm.value.image;

		obj.adress = new Adress();
		obj.adress.codePostal = this.UserForm.value.codePostal;
		obj.adress.rue = this.UserForm.value.rue;
		obj.adress.ville = this.UserForm.value.ville;
		obj.adress.numero = this.UserForm.value.numero;
		///obj.createdBy = this.DEFAULT_USER.userUsername;
		let dv = new Date().toISOString();

		if (this.data.param == "Update") {
			obj.login = this.user.login;
			obj.firstName = this.user.firstName;
			obj.lastName = this.data.lastName;
			obj.image = this.DEFAULT_USER.image;
		    obj.createdDate = dv;
			this.gProvider.updateObject(obj, "/users").subscribe(data => {
				console.log("update user: ", obj);
				//GlobalFunction.showMsgSuccess();
			}, error => {
				console.log("update user error");
				let msg = error["error"]["message"];
				if (msg == null || msg.length < 4) {
					msg = "Can't connect to the server. ";
					this.showMsg(msg)
				}
			});
		} else if (this.data.param == "Delete") {
			this.gProvider.deleteObj(this.user.id + "", "/users").subscribe(data => {
				console.log("delete user: ", obj);
				//GlobalFunction.showMsgSuccess();
			}, error => {
				let msg = error["error"]["message"];
				if (msg == null || msg.length < 4) {
					msg = "Can't connect to the server. ";
					this.showMsg(msg)
				}
			});
		} else if (this.data.param == "Add") {
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

		this.onNoClick();
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	showMsg(msg: string): void {
		const dialogRef = this.dialog.open(DialogMsg, {
			width: '350px',
			data: { msg: msg }
		});
	}

}