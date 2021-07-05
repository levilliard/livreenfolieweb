import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Compte } from 'src/app/models/models';
import { GenericProvider } from 'src/app/providers/generic';
import { CompteCrudComponent } from '../compte-crud/compte-crud.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-compte-view',
  templateUrl: './compte-view.component.html',
  styleUrls: ['./compte-view.component.css']
})
export class CompteViewComponent implements OnInit {

  comptes: Array<Compte> = new Array<Compte>();
  _owners = [];

  displayedColumns: string[] = ['Numero', 'Montant', 'Owner'];
  dataSource = new MatTableDataSource<Compte>(this.comptes);
  compte: Compte;
  filterForm: FormGroup;

  constructor(private dialog: MatDialog, private gProvider: GenericProvider, private formBuilder: FormBuilder){
    this.comptes = [];
    this.compte = new Compte();

    this.filterForm = formBuilder.group({
      numero: ['', ],
      owner: [' ']
    })
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.refresh();
  }

  public refresh(){
    this.gProvider.getArrayOfObject("/accounts").subscribe(res=>{
      this.comptes = <Array<Compte>>res;
      this.dataSource = new MatTableDataSource<Compte>(this.comptes);
      this.dataSource.paginator = this.paginator;
    })
    this.filterForm.reset();
  }

  getData(){
    let obj = new Compte();
    obj.numero = this.filterForm.value["numero"]
    obj.owner = this.filterForm.value["owner"]
    this.gProvider.filterData(obj, "/compte/filter").subscribe(res=>{
      this.comptes = <Array<Compte>>res;
      this.dataSource = new MatTableDataSource<Compte>(this.comptes);
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
    let uri = "/compte";
    this.filterForm.reset();

    this.gProvider.getArrayOfObject(uri).subscribe(res=>{
      this.comptes = <Array<Compte>>res;
      this.dataSource = new MatTableDataSource<Compte>(this.comptes);
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

		let dialogRef = this.dialog.open(CompteCrudComponent, {
			width: "700px",
			height: "80%",
			data: data
		});

		dialogRef.afterClosed().subscribe(result => {
			 this.getData()
		});
	}

}
