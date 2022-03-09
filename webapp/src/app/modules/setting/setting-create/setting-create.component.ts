import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-create',
  templateUrl: './setting-create.component.html',
  styleUrls: ['./setting-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingCreateComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateAd() {
    this.router.navigate(['setting/conexao']);
  }

  navigateEmail() {
    this.router.navigate(['setting/criacao']);
  }
}
