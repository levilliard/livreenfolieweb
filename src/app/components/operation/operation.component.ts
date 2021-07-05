import { Component, OnInit } from '@angular/core';
import { find } from 'rxjs/operators';
import { Operation } from 'src/app/models/models';
import { GenericProvider } from 'src/app/providers/generic';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {

  data: Array<Operation> = [];


  constructor(private gProvider: GenericProvider) { }

  ngOnInit() {
  }
}
