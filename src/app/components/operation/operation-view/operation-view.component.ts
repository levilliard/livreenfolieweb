import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Operation } from 'src/app/models/models';
import { GenericProvider } from 'src/app/providers/generic';
import { OperationCrudComponent } from '../operation-crud/operation-crud.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-operation-view',
  templateUrl: './operation-view.component.html',
  styleUrls: ['./operation-view.component.css']
})
export class OperationViewComponent implements OnInit {

  operations: Array<Operation> = new Array<Operation>();
  _owners = [];

  displayedColumns: string[] = ['Montant', 'Compte', 'Date'];
  dataSource = new MatTableDataSource<Operation>(this.operations);
  operation: Operation;
  filterForm: FormGroup;

  constructor(private dialog: MatDialog, private gProvider: GenericProvider, private formBuilder: FormBuilder){
    this.operations = [];
    this.operation = new Operation();

    this.filterForm = formBuilder.group({
      compte: [' ']
    })
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.refresh();
  }

  public refresh(){
    this.gProvider.getArrayOfObject("/operation/index").subscribe(res=>{
      this.operations = <Array<Operation>>res;
      this.dataSource = new MatTableDataSource<Operation>(this.operations);
      this.dataSource.paginator = this.paginator;
    })
    this.filterForm.reset();
  }

  getData(){
    let obj = new Operation();
    obj.compte = this.filterForm.value["compte"]
    this.gProvider.filterData(obj, "/operation/filter").subscribe(res=>{
      this.operations = <Array<Operation>>res;
      this.dataSource = new MatTableDataSource<Operation>(this.operations);
      this.dataSource.paginator = this.paginator;
    }, error=>{
      console.log("error", error);
    })
  }

  public toPrint(){
    
  }

  getType(tp: boolean){
    if(tp){
      return 'OUI';
    }

    return 'NON';
  }
  
  public refreshData(){
    let uri = "/operation";
    this.filterForm.reset();

    this.gProvider.getArrayOfObject(uri).subscribe(res=>{
      this.operations = <Array<Operation>>res;
      this.dataSource = new MatTableDataSource<Operation>(this.operations);
      this.dataSource.paginator = this.paginator;
    }, error=>{
      console.log(" error: ", error);
    })
  }

  public convertDate(date: string) {
    let temp;
    try {
      temp = date.split("T")[0];
    } catch (e) {

    }

    if (temp != null) {
      return temp;
    } else {
      return date;
    }
  }

  getState(state: boolean){
    if(state == null){
      return "NON DISPO";
    }else if(state == true){
      return "OUI"
    }else{
      return "NON"
    }
  }
  
	openDialog(data, param): void {
    data.param = param;

		let dialogRef = this.dialog.open(OperationCrudComponent, {
			width: "700px",
			height: "80%",
			data: data
		});

		dialogRef.afterClosed().subscribe(result => {
			 this.getData()
		});
	}

}
