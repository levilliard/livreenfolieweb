import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Livre, User } from 'src/app/models/models';
import { DialogUserUpdateDialog } from '../../user/user.component';
import { Router } from '@angular/router';
import { GenericProvider } from 'src/app/providers/generic';
import { AppSettings } from 'src/app/providers/app-settings';
import { DialogMsg } from 'src/app/shared/app-msg/dialog-msg.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-livre-crud',
  templateUrl: './livre-crud.component.html',
  styleUrls: ['./livre-crud.component.css'],
  providers: [GenericProvider,
  ]
})
export class LivreCrudComponent implements OnInit {
  static livre(arg0: string, livre: any) {
    throw new Error("Method not implemented.");
  }

  public livre: Livre;
  _owners = [];

  livreForm: FormGroup;
  isDelete: boolean;
  isDetails: boolean;
  DEFAULT_USER: User;
  minDate = "1900-01-01";
  currentDate: Date;
  isOk: boolean = false;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<LivreCrudComponent>,
    private router: Router,
    private formBuilder: FormBuilder,
    private gProvider: GenericProvider,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.isDelete = (this.data.param == "Delete" || this.data.param == "Details");
    this.isDetails = this.data.param == "Details";
    console.log("details bool: ", this.data);
    this.livre = <Livre>this.data;
    this.currentDate = new Date();


    this.livreForm = this.formBuilder.group({
      isbn: ['', Validators.required],
      dataPub: ['',],
      categorie: ['',],
      idAuteurs: ['', Validators.required],
      prix: ['', Validators.required],
      stock: ['',],
    });

    if (this.data.param == "Update" || this.isDelete) {
      console.log("Data User: ", this.data);
      this.livreForm.patchValue({
        'isbn': this.data['isbn'],
        'dataPub': this.data['dataPub'],
        'categorie': this.data['categorie'],
        'idAuteurs': this.data['idAuteurs'],
        'prix': this.data['prix'],
        'stock': this.data['stock'],
      })
    } else if (this.data.param == "Add") {
      this.livreForm.setValue({
        'isbn': '',
        'dataPub': '',
        'categorie': '',
        'idAuteurs': '',
        'prix': '',
        'stock': '',
      })
    } else if (this.data.param == "Details") {
      this.livreForm.patchValue({
        'isbn': this.data['isbn'],
        'dataPub': this.data['dataPub'],
        'categorie': this.data['categorie'],
        'idAuteurs': this.data['idAuteurs'],
        'prix': this.data['prix'],
        'stock': this.data['stock'],
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

  public static getCurrentLivre() {
    return this.livre;
  }

  onClickSave(): void {

    let obj: Livre = <Livre>this.livreForm.value;;

    //------------------------------------------------------------------------------------------------

    obj.id = this.livre.id;
    obj.isbn = this.livreForm.value.isbn;
    obj.categorie = this.livreForm.value.categorie;
    let dv = new Date().toISOString();



    if (this.data.param == "Update") {
      
      this.gProvider.updateObject(obj, "/livre/" + this.livre.id).subscribe(data => {
        console.log("update livre: ", obj);
        //GlobalFunction.showMsgSuccess();
      }, error => {
        if (error['status'] != null && error['status'] != 200) {
          this.showMsg("Error: " + error["error"]["message"])
        }
      });
    } else if (this.data.param == "Delete") {
      this.gProvider.deleteObj(this.livre.id + "", "/livre/" + this.livre.id).subscribe(data => {
        console.log("delete livre: ", obj);
        this.livre = <Livre>obj;
        //GlobalFunction.showMsgSuccess();
      }, error => {
        if (error['status'] != null && error['status'] != 200) {
          this.showMsg("Error: " + error["error"]["message"])
        }
      });
    } else if (this.data.param == "Add") {

      this.gProvider.addObject(obj, "/livre").subscribe(data => {
        console.log("add livre: ", data);
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