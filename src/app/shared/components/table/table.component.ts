import { Component, OnInit, ViewChild, EventEmitter, PipeTransform, Input, Output } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public dataSource = new MatTableDataSource<any>([]);

  // Inputs
  @Input() displayedColumns: string[];
  @Input() columnsNames: string[];
  @Input() list: any[];

  // Outputs
  @Output() editEvent = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.list);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  edit(element) {
    this.editEvent.emit(element);
  }

  apllyOptions(row, columnName): string {
    let columns = columnName.split(':');
    let res = '';
    for (let column of columns){
      res = res + row[column];
    }

    return res;
  }

  showDescriptiom(row, columnName): string {
    let keys = columnName.split('.');
    console.log(keys);
    let obj = row;
    for (let key of keys){
      obj = obj[key];
      console.log(obj);
    }
    return obj;
  }

}
