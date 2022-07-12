import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customize } from 'src/app/models/customize';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomizeDatastoreService {
  readonly ROOT_URL = `${environment.BACK_END_HOST}customize`;

  constructor(private http: HttpClient) { }

  update(customize: Customize) {
    return this.http.patch<Customize>(this.ROOT_URL + '/' + customize.id, customize);
  }

  list() {
    return this.http.get<Customize[]>(this.ROOT_URL);
  }

  findActualCustom() {
    return this.http.get<Customize>(this.ROOT_URL + '/actual-custom');
  }
}
