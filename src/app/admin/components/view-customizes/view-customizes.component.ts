import { Component, OnInit } from '@angular/core';
import { Customize } from 'src/app/models/customize';
import { CustomizeService } from '../../services/customize.service';

@Component({
  selector: 'app-view-customizes',
  templateUrl: './view-customizes.component.html',
  styleUrls: ['./view-customizes.component.scss']
})
export class ViewCustomizesComponent implements OnInit {
  public customizes : Customize[] = [];
  
  constructor(private customizeService: CustomizeService) { }

  ngOnInit(): void {
    this.customizeService.list().subscribe(customizes =>{
      this.customizes = customizes;
    });
  }

}
