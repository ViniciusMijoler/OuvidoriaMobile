import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiUrlService } from './api-url.service';
import { Situation } from '../models/situation';

@Injectable({
  providedIn: 'root'
})
export class SituationService {

  constructor(
    private http: HttpClient
  ) { }

  getSituations() {
    let url = ApiUrlService.APIurl + 'situacao';

    return new Promise((resolve, reject) => {
      setTimeout(() => reject('Timeout'), ApiUrlService.TIMEOUT);

      this.http.get(url, {})
          .subscribe((result: any) => {
              resolve(result.records as Situation[]);
          }, err => {
              console.error(err);
              reject(err.status);
          });
    });
  }

}
