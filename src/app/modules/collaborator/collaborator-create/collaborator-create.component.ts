import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-collaborator-create',
  templateUrl: './collaborator-create.component.html',
  styleUrls: ['./collaborator-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorCreateComponent implements OnInit {
  collaboratorForm!: FormGroup;
  step: number = 2;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.collaboratorForm = this.fb.group({
      collaboratorGroup: ['', Validators.required],
    });
  }

  saveCustomer() {
    if (this.collaboratorForm.valid) {
      const data = this.collaboratorForm.getRawValue();
      console.log(
        '🚀 ~ file: customer-create.component.ts ~ line 29 ~ CustomerCreateComponent ~ saveCustomer ~ data',
        data
      );
    }
  }
  handleChanges(value: any): void {
    console.log(
      '🚀 ~ file: customer-create.component.ts ~ line 36 ~ CustomerCreateComponent ~ handleChanges ~ value',
      value
    );
  }

  handleStep(number: number): void {
    this.step = number;
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.step < 4 && direction === 'next') {
      this.step += 1;
    }
  }
}
