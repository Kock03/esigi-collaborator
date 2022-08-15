import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, Subject } from 'rxjs';
import { ResumeProvider } from 'src/providers/resume-providers/resume.provider';

import { ResumeCreateComponent } from '../resume-create/resume-create.component';
import { ResumeRegisterTabComponent } from '../resume-create/resume-register-tab/resume-register-tab.component';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';

export interface Resume {
  id: string;
  firstName: string;
  birthDate: Date;
  phoneNumber: number;
  Phone: {};
}

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  private _unsubscribeAll: Subject<any>;
  displayedResume: string[] = ['name', 'birthDate', 'phoneNumber', 'icon'];

  resumes!: Resume[];
  filteredResumeList = new MatTableDataSource();
  index: any = null;
  Resume: any;
  step: number = 1;
  form!: FormGroup;
  resume!: any;

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private resumeProvider: ResumeProvider,
    private dialogService: ConfirmDialogService,
    private snackbarService: SnackBarService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.getResumeList();
    this.initFilter();
  }

  async searchResumes(query?: string) {
    try {
      this.resumes = await this.resumeProvider.findByName(query);
    } catch (error) {
      console.error(error);
    }
  }


  async selectList(ev: any) {
    if (ev.value == 1) {
      return (this.filteredResumeList = this.resumes =
        await this.resumeProvider.findAll());
    }
    if (ev.value == 2) {
      return console.log(
        'checked 2'
      ); /*(this.filteredResumeList = this.resumes =
        await this.resumeProvider.[função de busca]());*/
    }
    if (ev.value == 3) {
      return console.log(
        'checked 3'
      ); /*(this.filteredResumeList = this.resumes =
        await this.resumeProvider.[função de busca]());*/
    }
    if (ev.value == 4) {
      return console.log(
        'checked 4'
      ); /*(this.filteredResumeList = this.resumes =
        await this.resumeProvider.[função de busca]());*/
    }
    if (ev.value == 5) {
      return console.log(
        'checked 5'
      ); /*(this.filteredResumeList = this.resumes =
        await this.resumeProvider.[função de busca]());*/
    }
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  createResume() {
    this.router.navigate(['curriculo/novo']);
  }

  editResume(resumeId: any) {
    this.router.navigate([`curriculo/${resumeId}`]);
    const method = 'edit';
    sessionStorage.setItem('resume_method', method)
    sessionStorage.setItem('resume_id', resumeId);
  }

  async deleteResume(resumeId: any) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir este currículo?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async confirmed => {
      if (confirmed) {
        try {
          const resumes = await this.resumeProvider.destroy(resumeId);
          this.getResumeList();

          this.snackbarService.successMessage('Currículo excluído com sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Deletar');
        }
      }
    });
  }

  async getResumeList() {
    try {
      this.filteredResumeList.data = this.resumes =
        await this.resumeProvider.findAll();
      this.filteredResumeList.sort = this.sort;
    } catch (error) {
      console.error(error);
    }
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe((res) => {
        this.filteredResumeList.data = this.resumes.filter((resume) =>
          resume.firstName
            .toLocaleLowerCase()
            .includes(this.filter.nativeElement.value.toLocaleLowerCase())
        )
        const params = `firstName=${this.filter.nativeElement.value}`;
        this.searchResumes(params);
      });
  }
}
