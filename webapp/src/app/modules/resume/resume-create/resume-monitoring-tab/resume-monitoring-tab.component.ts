import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resume-monitoring-tab',
  templateUrl: './resume-monitoring-tab.component.html',
  styleUrls: ['./resume-monitoring-tab.component.scss']
})
export class ResumeMonitoringTabComponent implements OnInit {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  next() {
    this.onChange.next(true);
  }
}
