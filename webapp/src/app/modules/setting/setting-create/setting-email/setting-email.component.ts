import { Component, OnInit, ViewEncapsulation,Input} from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

export interface emailTypes {
  id: number;
  name: string;
}

@Component({
  selector: 'app-setting-email',
  templateUrl: './setting-email.component.html',
  styleUrls: ['./setting-email.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingEmailComponent implements OnInit {
  @Input('form') settingForm!: FormGroup;

  typeControl = new FormControl();

  types: emailTypes[] = [
    { id: 1, name: 'SMTP' },
    { id: 2, name: 'POP' },
    { id: 3, name: 'IMAP' },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  
  compareSelect(o1: any, o2: any): boolean {
    if (!o1 || !o2) {
      return false;
    }
    return o1.id === o2.id;
  }

 

}
