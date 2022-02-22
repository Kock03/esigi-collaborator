import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, Subject } from 'rxjs';
import { ResumeProvider } from 'src/providers/resume.provider';

import { ResumeCreateComponent } from '../resume-create/resume-create.component';
import { ResumeRegisterTabComponent } from '../resume-create/resume-register-tab/resume-register-tab.component';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';

export interface Resume {
  id: string;
  firstName: string;
  birthDate: Date;
  phoneNumber: number;
}


@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeListComponent implements OnInit {
  @ViewChild('filter', {static:true}) filter!: ElementRef;

  private _unsubscribeAll: Subject<any>;

  displayedResume: string[] = [
    'name',
    'birthDate',
    'phoneNumber',
    'icon',
  ];

  
  resumes!: Resume[];
  filteredResumeList!: any[];
  index: any = null;
  Resume: any;
  resume!: any;

  constructor(private router: Router,
    private resumeProvider: ResumeProvider,
    private dialogService: ConfirmDialogService,
    private snackbarService: SnackBarService,) {
      this._unsubscribeAll = new Subject();
     }



  ngOnInit(): void {
    this.getResumeList();
    this.initFilter();

  }

  createResume() {
    this.router.navigate(['curriculo/novo']);
  }
  
  editResume(resumeId: any) {
    this.router.navigate([`curriculo/${resumeId}`]);
  }


  async deleteResume(resumeId: any) {
    const options = {
      data: {
        title: 'Anteção',
        subtitle: 'Você tem certeza que deseja excluir este currículo?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async (confirmed) => {
      if (confirmed) {
        try {
          const jobs = await this.resumeProvider.destroy(resumeId);
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
      this.filteredResumeList = this.resumes =
        await this.resumeProvider.findAll();
    } catch (error) {
      console.error(error);
    }
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
    .pipe(debounceTime(200), distinctUntilChanged())

    .subscribe((res) => {
      this.filteredResumeList = this.resumes.filter(
        (resume) =>
          resume.firstName
            .toLocaleLowerCase()
            .includes(this.filter.nativeElement.value.toLocaleLowerCase())
      );
    });
  }

}
