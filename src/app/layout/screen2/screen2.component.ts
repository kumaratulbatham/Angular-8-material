import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  date?: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', date: Date.now() },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', date: Date.now() },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', date: Date.now()},
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', date: Date.now()},
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', date: Date.now()},
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', date: Date.now()},
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', date: Date.now()}
];

@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.scss']
})
export class Screen2Component implements OnInit {
  displayedColumns = ['position', 'name', 'weight', 'symbol', 'date'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() { }

  ngOnInit() {
    // console.log(this.dataSource)
  }

  /** Map and Set Data Structure in Javascript */
  getArrrayDetails() {
    let arrayData = [2, 2, 3, 8, 6, 8, 7, 9, 5, 1, 6];
    var setData = new Set(arrayData);
    console.log('setData:', '----------',setData);
    var mapData = new Map();
    var keyString = 'a string',
    keyObj = {},
    keyFunc = function () { };
    mapData.set(keyString, "value associated with 'a string'");
    mapData.set(keyObj, 'value associated with keyObj');
    mapData.set(keyFunc, 'value associated with keyFunc');
    console.log('mapData:', '----------',mapData);
  }

}
