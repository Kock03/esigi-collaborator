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
  displayedResume: string[] = ['name', 'client', 'resumeName', 'openingDate', 'status', 'icon'];

  resumes!: Resume[];
  filteredResumeList = new MatTableDataSource();
  index: any = null;
  Resume: any;
  step: number = 1;
  form!: FormGroup;
  resume!: any;
  filename!: string;
  token!: string;

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

  async searchResumes(name: string) {
    const data = {
      name: name,
    };
    try {
      this.resumes = await this.resumeProvider.findByName(data);
    } catch (error) {
      console.error(error);
    }
  }


  async selectList(ev: any) {

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

  editResume(resumeId: any, address: any) {
    this.router.navigate([`curriculo/${resumeId}`]);
    const method = 'edit';
    sessionStorage.setItem('resume_method', method)
    sessionStorage.setItem('country_value', address.country);
    sessionStorage.setItem('flag_value', address.flag);
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
        const params = this.filter.nativeElement.value;
        this.searchResumes(params);
      });
  }

  async pdfDownload(resumeId: string): Promise<void> {
    let pdfName = await this.resumeProvider.generatePDF(resumeId);
    if (pdfName) {
      this.filename = pdfName.file_name
      this.resumeProvider.downloadPDF(this.filename).subscribe((res: any) => {
        let blob: Blob = res.body as Blob;
        let a = document.createElement('a');
        a.download = this.filename
        a.href = window.URL.createObjectURL(blob);
        a.click()
      })
    }
  }

  goHome(): void {
    // location.replace(`http://192.168.8.184:3406/validate/${this.token}`);
    this.token = localStorage.getItem('token')!;
    location.replace(`http://localhost:3406/validate/${this.token}`)
  }
}
