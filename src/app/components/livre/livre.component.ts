import { Component, OnInit } from '@angular/core';
import { find } from 'rxjs/operators';
import { Livre } from 'src/app/models/models';
import { GenericProvider } from 'src/app/providers/generic';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.scss']
})
export class LivreComponent implements OnInit {

  data: Array<Livre> = [];


  constructor(private gProvider: GenericProvider) { }

  ngOnInit() {
  }
}
