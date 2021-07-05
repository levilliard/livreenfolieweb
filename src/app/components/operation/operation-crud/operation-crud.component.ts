import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Operation, User } from 'src/app/models/models';
import { DialogUserUpdateDialog } from '../../user/user.component';
import { Router } from '@angular/router';
import { GenericProvider } from 'src/app/providers/generic';
import { AppSettings } from 'src/app/providers/app-settings';
import { DialogMsg } from 'src/app/shared/app-msg/dialog-msg.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-operation-crud',
  templateUrl: './operation-crud.component.html',
  styleUrls: ['./operation-crud.component.css'],
  providers: [GenericProvider,
  ]
})
export class OperationCrudComponent implements OnInit {
  static operation(arg0: string, operation: any) {
    throw new Error("Method not implemented.");
  }

  public operation: Operation;
  _comptes = [];

  operationForm: FormGroup;
  isDelete: boolean;
  isDetails: boolean;
  DEFAULT_USER: User;
  minDate = "1900-01-01";
  currentDate: Date;
  isOk: boolean = false;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<OperationCrudComponent>,
    private router: Router,
    private formBuilder: FormBuilder,
    private gProvider: GenericProvider,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.isDelete = (this.data.param == "Delete" || this.data.param == "Details");
    this.isDetails = this.data.param == "Details";
    console.log("details bool: ", this.data);
    this.operation = <Operation>this.data;
    this.currentDate = new Date();


    this.operationForm = this.formBuilder.group({
      montant: ['', Validators.required],
      type: ['', Validators.required],
      operationDate: ['', Validators.required],
      compte: ['', Validators.required],
    });

    
    if (this.data.param == "Update" || this.isDelete) {
      console.log("Data User: ", this.data);
      this.operationForm.patchValue({
        'montant': this.data['montant'],
        'type': this.data['type'],
        'operationDate': this.data['operationDate'],
        'compte': this.data['compte'],
      })
    } else if (this.data.param == "Add") {
      this.operationForm.setValue({
        'montant': '',
        'type': '',
        'operationDate': '',
        'compte': '',
      })
    } else if (this.data.param == "Details") {
      this.operationForm.patchValue({
        'montant': this.data['montant'],
        'type': this.data['type'],
        'operationDate': this.data['operationDate'],
        'compte': this.data['compte'],
      })
    }

    this.DEFAULT_USER = JSON.parse(localStorage.getItem("USER"));
  }

  ngOnInit(): void {
    this.gProvider.getArrayOfObject("/comptes").subscribe(data => {
			console.log("class found: ", data);
			this._comptes = <Array<User>>data;
		}, error => {
			console.log("users errors: ", error);
		});
  }



  public onChangeSite(site: string) {

  }

  public static getCurrentOperation() {
    return this.operation;
  }

  onClickSave(): void {

    let obj: Operation = <Operation>this.operationForm.value;;

    //------------------------------------------------------------------------------------------------
   
    obj.id = this.operation.id;
    obj.montant = this.operationForm.value.montant;
    obj.type = this.operationForm.value.type;
    obj.operationDate = this.operationForm.value.operationDate;
    obj.compte = this.operationForm.value.compte;
    let dv = new Date().toISOString();

    if (this.data.param == "Update") {
      
      this.gProvider.updateObject(obj, "/operation/" + this.operation.id).subscribe(data => {
        console.log("update operation: ", obj);
        //GlobalFunction.showMsgSuccess();
      }, error => {
        if (error['status'] != null && error['status'] != 200) {
          this.showMsg("Error: " + error["error"]["message"])
        }
      });
    } else if (this.data.param == "Delete") {
      this.gProvider.deleteObj(this.operation.id + "", "/operation/" + this.operation.id).subscribe(data => {
        console.log("delete operation: ", obj);
        this.operation = <Operation>obj;
        //GlobalFunction.showMsgSuccess();
      }, error => {
        if (error['status'] != null && error['status'] != 200) {
          this.showMsg("Error: " + error["error"]["message"])
        }
      });
    } else if (this.data.param == "Add") {

      this.gProvider.addObject(obj, "/operation").subscribe(data => {
        console.log("add operation: ", data);
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