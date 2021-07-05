import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Compte, User } from 'src/app/models/models';
import { DialogUserUpdateDialog } from '../../user/user.component';
import { Router } from '@angular/router';
import { GenericProvider } from 'src/app/providers/generic';
import { AppSettings } from 'src/app/providers/app-settings';
import { DialogMsg } from 'src/app/shared/app-msg/dialog-msg.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-compte-crud',
  templateUrl: './compte-crud.component.html',
  styleUrls: ['./compte-crud.component.css'],
  providers: [GenericProvider,
  ]
})
export class CompteCrudComponent implements OnInit {
  static compte(arg0: string, compte: any) {
    throw new Error("Method not implemented.");
  }

  public compte: Compte;
  _owners = [];

  compteForm: FormGroup;
  isDelete: boolean;
  isDetails: boolean;
  DEFAULT_USER: User;
  minDate = "1900-01-01";
  currentDate: Date;
  isOk: boolean = false;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CompteCrudComponent>,
    private router: Router,
    private formBuilder: FormBuilder,
    private gProvider: GenericProvider,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.isDelete = (this.data.param == "Delete" || this.data.param == "Details");
    this.isDetails = this.data.param == "Details";
    console.log("details bool: ", this.data);
    this.compte = <Compte>this.data;
    this.currentDate = new Date();


    this.compteForm = this.formBuilder.group({
      numero: ['', Validators.required],
      montant: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(40), Validators.required])],
      owner: ['', Validators.required],
    });

    if (this.data.param == "Update" || this.isDelete) {
      console.log("Data User: ", this.data);
      this.compteForm.patchValue({
        'numero': this.data['numero'],
        'montant': this.data['montant'],
        'owner': this.data['owner'],
      })
    } else if (this.data.param == "Add") {
      this.compteForm.setValue({
        'numero': '',
        'montant': '',
        'owner': ''
      })
    } else if (this.data.param == "Details") {
      this.compteForm.patchValue({
        'numero': this.data['numero'],
        'montant': this.data['montant'],
        'owner': this.data['owner'],
      })
    }

    this.DEFAULT_USER = JSON.parse(localStorage.getItem("USER"));
  }

  ngOnInit(): void {
    this.gProvider.getArrayOfObject("/users").subscribe(data => {
			console.log("class found: ", data);
			this._owners = <Array<User>>data;
		}, error => {
			console.log("users errors: ", error);
		});
  }



  public onChangeSite(site: string) {

  }

  public static getCurrentCompte() {
    return this.compte;
  }

  onClickSave(): void {

    let obj: Compte = <Compte>this.compteForm.value;;

    //------------------------------------------------------------------------------------------------

    obj.id = this.compte.id;
    obj.numero = this.compteForm.value.numero;
    obj.montant = this.compteForm.value.montant;
    let dv = new Date().toISOString();



    if (this.data.param == "Update") {
      
      this.gProvider.updateObject(obj, "/compte/" + this.compte.id).subscribe(data => {
        console.log("update compte: ", obj);
        //GlobalFunction.showMsgSuccess();
      }, error => {
        if (error['status'] != null && error['status'] != 200) {
          this.showMsg("Error: " + error["error"]["message"])
        }
      });
    } else if (this.data.param == "Delete") {
      this.gProvider.deleteObj(this.compte.id + "", "/compte/" + this.compte.id).subscribe(data => {
        console.log("delete compte: ", obj);
        this.compte = <Compte>obj;
        //GlobalFunction.showMsgSuccess();
      }, error => {
        if (error['status'] != null && error['status'] != 200) {
          this.showMsg("Error: " + error["error"]["message"])
        }
      });
    } else if (this.data.param == "Add") {

      this.gProvider.addObject(obj, "/compte").subscribe(data => {
        console.log("add compte: ", data);
      }, error => {
        console.log(" error: ", error);
        if (error['status'] != null && error['status'] != 200) {
          this.showMsg("Error: " + error["error"]["message"])
        }
      });
    }

    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  showMsg(msg: string): void {
    const dialogRef = this.dialog.open(DialogMsg, {
      width: '350px',
      data: { msg: msg }
    });
  }


}