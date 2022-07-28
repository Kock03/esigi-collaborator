import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobProvider } from 'src/providers/job.provider';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobDetailComponent implements OnInit {
  step: number = 1;
  

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('job_detail_tab') == undefined) {
      sessionStorage.setItem('job_detail_tab', '1');
    }
    this.step = JSON.parse(sessionStorage.getItem('job_detail_tab')!);
  }

  handleChanges(value: any): void {}

  handleStep(number: number): void {
    this.step = number;
    sessionStorage.setItem('job_detail_tab', this.step.toString());
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.step < 2 && direction === 'next') {
      this.step += 1;
    }
  }

  backToList() {
    this.router.navigate(['vaga/lista']);
    sessionStorage.clear();
  }
}
