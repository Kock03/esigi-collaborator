import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {  FormGroup, Validators, FormBuilder  } from '@angular/forms';

@Component({
  selector: 'app-setting-create',
  templateUrl: './setting-create.component.html',
  styleUrls: ['./setting-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingCreateComponent implements OnInit {
  settingForm!: FormGroup;

  constructor(private router: Router, 
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.settingForm = this.fb.group({
      serverType : ['', Validators.required],
      door : ['', Validators.required],
      checkServer: ['', Validators.required],
      checkLogin: ['', Validators.required],    
    });
  }

  navigateAd(){
    this.router.navigate(['setting/conexao'])
  }

  navigateEmail(){
    this.router.navigate(['setting/criacao'])
  }


}
