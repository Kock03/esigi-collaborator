import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-setting-active-directory',
  templateUrl: './setting-active-directory.component.html',
  styleUrls: ['./setting-active-directory.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingActiveDirectoryComponent implements OnInit {
  @Input('form') settingForm!: FormGroup;
  

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.settingForm = this.fb.group({
      adAdress : ['', Validators.required],
      user: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6),
        ],
      ],
    }); 
  }

}
