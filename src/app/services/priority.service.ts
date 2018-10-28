import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiUrlService } from './api-url.service';
import { Priority } from '../models/priority';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  constructor(
    private http: HttpClient
  ) { }

  getPriorities() {
    let url = ApiUrlService.APIurl + 'prioridade';

    return new Promise((resolve, reject) => {
      setTimeout(() => reject('Timeout'), ApiUrlService.TIMEOUT);

      this.http.get(url, {})
          .subscribe((result: any) => {
              resolve(result.records as Priority[]);
          }, err => {
              console.error(err);
              reject(err.status);
          });
    });
  }

}
