import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';
import {  FormGroup } from '@angular/forms';


@Component({
  selector: 'app-setting-active-directory',
  templateUrl: './setting-active-directory.component.html',
  styleUrls: ['./setting-active-directory.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingActiveDirectoryComponent implements OnInit {
  @Input('form') settingForm!: FormGroup;
  

  constructor() { }

  ngOnInit(): void {
  }

}
