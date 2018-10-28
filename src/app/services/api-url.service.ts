import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {
  public static readonly APIurl: string = environment.APIurl;

  public static readonly TIMEOUT: number = 20000;
}
