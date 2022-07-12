import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SchedulePipe } from '../../pipes/schedule.pipe';

@Component({
  selector: 'app-professor-details',
  templateUrl: './professor-details.component.html',
  styleUrls: ['./professor-details.component.scss']
})
export class ProfessorDetailsComponent {
  @Input() public data: any;

  constructor(public activeModal: NgbActiveModal,
    private schedule: SchedulePipe) {    
    console.log(this.data);
  }

  viewMatter(){
    console.log(this.data);
  }

  
  close() {
    this.activeModal.close(true);
  }
}


