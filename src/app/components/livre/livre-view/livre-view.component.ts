import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Livre } from 'src/app/models/models';
import { GenericProvider } from 'src/app/providers/generic';
import { LivreCrudComponent } from '../livre-crud/livre-crud.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-livre-view',
  templateUrl: './livre-view.component.html',
  styleUrls: ['./livre-view.component.css']
})
export class LivreViewComponent implements OnInit {

  livres: Array<Livre> = new Array<Livre>();
  _owners = [];

  displayedColumns: string[] = ['Isbn', 'DatePub', 'Prix'];
  dataSource = new MatTableDataSource<Livre>(this.livres);
  livre: Livre;
  filterForm: FormGroup;

  constructor(private dialog: MatDialog, private gProvider: GenericProvider, private formBuilder: FormBuilder){
    this.livres = [];
    this.livre = new Livre();

    this.filterForm = formBuilder.group({
      isbn: ['', ],
      categorie: [' ']
    })
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.refresh();
  }

  public refresh(){
    this.gProvider.getArrayOfObject("/livre/index").subscribe(res=>{
      this.livres = <Array<Livre>>res;
      this.dataSource = new MatTableDataSource<Livre>(this.livres);
      this.dataSource.paginator = this.paginator;
    })
    this.filterForm.reset();
  }

  getData(){
    let obj = new Livre();
    obj.isbn = this.filterForm.value["isbn"]
    obj.categorie = this.filterForm.value["categorie"]
    this.gProvider.filterData(obj, "/livre/filter").subscribe(res=>{
      this.livres = <Array<Livre>>res;
      this.dataSource = new MatTableDataSource<Livre>(this.livres);
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
    let uri = "/livre";
    this.filterForm.reset();

    this.gProvider.getArrayOfObject(uri).subscribe(res=>{
      this.livres = <Array<Livre>>res;
      this.dataSource = new MatTableDataSource<Livre>(this.livres);
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

		let dialogRef = this.dialog.open(LivreCrudComponent, {
			width: "700px",
			height: "80%",
			data: data
		});

		dialogRef.afterClosed().subscribe(result => {
			 this.getData()
		});
	}

}
