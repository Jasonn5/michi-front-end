import { Injectable } from '@angular/core';
import { Customize } from 'src/app/models/customize';
import { CustomizeDatastoreService } from './customize-datastore.service';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {

  constructor(private customizeDatastoreService: CustomizeDatastoreService) { }

  public updateLocation(customizeToEdit: Customize, customize) {
    customizeToEdit.minimum = customize.minimum;
    customizeToEdit.maximum = customize.maximum;
    customizeToEdit.reason = customize.reason;

    return this.customizeDatastoreService.update(customizeToEdit);
  }

  list() {
    return this.customizeDatastoreService.list();
  }

  public findActualCustom() {
    return this.customizeDatastoreService.findActualCustom();
  }
}
