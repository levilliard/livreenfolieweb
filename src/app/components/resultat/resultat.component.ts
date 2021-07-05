import { Component, OnInit } from '@angular/core';
import { GenericProvider } from '../../../app/providers/generic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.scss'],
  providers: [GenericProvider, DatePipe,]
})
export class ResultatComponent implements OnInit {
  places: Array<any> = [];
  count = 0;
  _count = 0;
  total_count = 0;
  labels1: string[];
  data1: number[];
  currentDate = new Date();
  edate: Date;
  sdate: Date;
  filterForm: FormGroup;

  constructor(
    private formBulider: FormBuilder,     
    private router: Router,
    private gProvider: GenericProvider, 
    private datePipe: DatePipe, ) {
    this.labels1 = [];
    this.data1 = [];
  }

  ngOnInit() {
    this.filterForm = this.formBulider.group({
      individuId: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(20), Validators.required])],
      //dateNaissance: ["", Validators.required],
      //nom: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(45), Validators.required])],
      // prenom: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(45), Validators.required])],
    });

    // this.gProvider.getCounted("/signesymptomes/count").subscribe(res => {
    //   this.count = res;
    //   if(this.count < 0){
    //     this.count = 0;
    //   }
    //   console.log("count:", this.count)

    // }, error => {
    //   console.log(" error:", error)
    // });

  }

  onSave(){
    console.log(" data: ", this.filterForm.value);
    //http://200.4.164.52/CovidExamResult/?NIHID=IMIS-REG-007033&&DateNaiss=1987-01-24&&Fullname=BERNARD%20SUZANNE
    let url = "http://200.4.164.52/CovidExamResult/?NIHID=" + this.filterForm.value["individuId"];
    window.location.href = url;
  }

  redirectTo(){
    this.router.navigate(['/dashboard/formulaire'])
  }

  verifyDate() {
    if (this.filterForm.value["sdate"] == null || (this.filterForm.value["sdate"] + "").trim().length == 0) {
      this.filterForm.patchValue({
        "edate": ""
      })
    }
  }
}
