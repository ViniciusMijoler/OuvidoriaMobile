import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Manifestation } from '../../models/manifestation';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { ManifestationService } from '../../services/manifestation.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-manifestations',
  templateUrl: './manifestations.component.html',
  styleUrls: ['./manifestations.component.scss']
})
export class ManifestationsComponent implements OnInit, OnDestroy {

  public subManifestitions: Subscription;

  public displayedColumns: string[] = [
    'year:sequence',
    'dateIncluded',
    'classification.description',
    'segment.description',
    'place.description',
    'subject.description',
    'subSubject.description',
    'situation.description',
    'buttons'
  ];
  public columnsNames: string[] = [
    'Protocolo',
    'Data inclusão',
    'Classificação',
    'Segmento',
    'Origem',
    'Assunto',
    'SubAssunto',
    'Situação'
  ];
  public list: Manifestation[] = [];

  public dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private manifestationService: ManifestationService
  ) {
    this.getManifestations();
    this.startAutoRefresh();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.stopManifestations();
  }

  getManifestations() {
    this.manifestationService.getManifestations()
      .then((res: any) => {
        this.list = res;
        this.dataSource = new MatTableDataSource<any>(this.list);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((err) => {
        console.log(err);
        this.list = [];
      });
  }

  startAutoRefresh() {
    console.log('Starting auto refresh orders');
    if (this.subManifestitions) {
      return;
    }
    this.subManifestitions = interval(10000).subscribe(x => {
        this.getManifestations();
    });
  }

  stopManifestations() {
      console.log('Stoping auto refresh orders');
      if (this.subManifestitions) {
          this.subManifestitions.unsubscribe();
          this.subManifestitions = undefined;
      }
  }


  edit(manifestation) {
    this.router.navigate(['/manifestation'], { queryParams: { year: manifestation.year, sequence: manifestation.sequence } });
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
    let obj = row;
    for (let key of keys){
      obj = obj[key];
    }
    return obj;
  }

}
