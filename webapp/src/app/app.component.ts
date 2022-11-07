import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'esigi-collaborator';
  activeMenu: string = '';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  collaboratorId!: string | null;
  token!: string;
  openTree: boolean = false;
  compare!: any;

  home: string = 'portal'
  collaborator: string = 'colaborador';
  jobs: string = 'vaga';
  resume: string = 'curriculo';

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    public translateService: TranslateService,
    private userService: UserService
  ) {
    translateService.addLangs(['en-US', 'pt-BR']);
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt-BR');
    this.translateService.use('pt-BR');
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((res: any) => {
        let valid = res.url.indexOf('validate');
        if (valid === -1) {
        this.token = localStorage.getItem('token')!;
          if (!this.token) {
            location.replace(`http://192.168.8.184:3406/validate/${this.token}`);
          }
        }
        if (res.url === '/') {
          this.activeMenu = 'colaborador';
        } else {
          this.activeMenu = res.url.split('/')[1];
        }
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 800px)']).subscribe((res: any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    }, 50);
  }

  recize() {
    this.openTree = this.openTree === true ? false : true;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  navigator(route: any) {
    switch (route) {
      case 'portal':
        location.replace(`http://192.168.8.184:3406/validate/${this.token}`);
      break;
      case 'colaborador':
        this.router.navigate(['colaborador/lista']); 
        break;
      case 'vaga':
        this.router.navigate(['vaga/lista']);
        break;
      case 'curriculo':
        this.router.navigate(['curriculo/lista']);
        break;
    }
  }

  logout(): void {
    this.userService.logout();
  }
}
