import { Component, OnInit } from '@angular/core';
import { find } from 'rxjs/operators';
import { Compte } from 'src/app/models/models';
import { GenericProvider } from 'src/app/providers/generic';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  data: Array<Compte> = [];


  constructor(private gProvider: GenericProvider) { }

  ngOnInit() {
  }
}
