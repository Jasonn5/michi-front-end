import { Component, OnInit } from '@angular/core';
import { Customize } from 'src/app/models/customize';
import { CustomizeService } from '../../services/customize.service';

@Component({
  selector: 'app-add-customize',
  templateUrl: './add-customize.component.html',
  styleUrls: ['./add-customize.component.scss']
})
export class AddCustomizeComponent implements OnInit {
  public minimun = 0;
  public maximum = 0;
  public customize: Customize = null;
  public customizeToEdit: Customize = new Customize();
  public reason = "";

  constructor(private customizeService: CustomizeService) { }

  ngOnInit(): void {
    this.customizeService.findActualCustom().subscribe(customize => {
      this.customize = customize;
      this.minimun = this.customize.minimum;
      this.maximum = this.customize.maximum;
      this.reason = this.customize.reason;
    });
  }

  saveChanges() {
    if (this.minimun > 0) {
      if (this.maximum > this.minimun) {
        this.customizeToEdit.minimum = this.minimun;
        this.customizeToEdit.maximum = this.maximum;
        this.customizeToEdit.reason =  this.reason;
        this.customizeService.updateLocation(this.customize, this.customizeToEdit).subscribe(() => {
          alert("Los Cambios se Guardaron Exitosamente");
          location.reload();
        });
      }else{
        alert("El maximo tiene que ser mayor al minimo")
      }
    } else {
      alert("El minimo no puede ser menor a 1")
    }
  }
}
