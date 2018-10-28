import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiUrlService } from './api-url.service';
import { Manifestation } from '../models/manifestation';

@Injectable({
  providedIn: 'root'
})
export class ManifestationService {

  constructor (
    private http: HttpClient
  ) { }

  getManifestations() {
    let url = ApiUrlService.APIurl + 'ouvidoria';

    return new Promise((resolve, reject) => {
      setTimeout(() => reject('Timeout'), ApiUrlService.TIMEOUT);

      this.http.get(url, {})
          .subscribe((result: any) => {
              resolve(result.records as Manifestation[]);
          }, err => {
              console.log(err);
              reject(err.status);
          });
    });
  }

  getManifestation(year?: number, sequence?: number ) {
    let url = ApiUrlService.APIurl + 'ouvidoria';
    url = url + '?year=' + year + '&sequence=' + sequence;

    return new Promise((resolve, reject) => {
      setTimeout(() => reject('Timeout'), ApiUrlService.TIMEOUT);

      this.http.get(url, {})
          .subscribe((result: any) => {
              resolve(result.records[0] as Manifestation[]);
          }, err => {
              console.log(err);
              reject(err.status);
          });
    });
  }

  sendAnswer(manifestation: Manifestation) {
    let http = this.http;
    let url = ApiUrlService.APIurl + 'ouvidoria';

    let body = {
      year: manifestation.year,
      sequence: manifestation.sequence,
      answerLetter: manifestation.answerLetter,
      priorityId: manifestation.priorityId,
      situationId: manifestation.situation.id
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => reject('Timeout'), ApiUrlService.TIMEOUT);

      http.put(url, body, {})
          .subscribe((result: any) => {
              resolve(result);
          }, err => {
              console.error(err);
              reject(err.status);
          });
    });
  }

}
