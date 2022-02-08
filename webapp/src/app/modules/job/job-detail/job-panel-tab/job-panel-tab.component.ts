import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, fromEvent, debounceTime, distinctUntilChanged } from 'rxjs';
import { SnackBarService } from 'src/services/snackbar.service';

export interface Interview {
  nameCandidate: string;
  behavioralInterviewDate: string;
  technicalInterviewDate: string;
  responsible: string;
  status: number;
}

@Component({
  selector: 'app-job-panel-tab',
  templateUrl: './job-panel-tab.component.html',
  styleUrls: ['./job-panel-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobPanelTabComponent implements OnInit {
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  private _unsubscribeAll: Subject<any>;
  displayedJob: string[] = [
    'nameCandidate',
    'behavioralInterviewDate',
    'technicalInterviewDate',
    'responsible',
    'status',
    'icon',
  ];
  interviews!: Interview[];
  filteredInterviewList!: any[];


  constructor(
    private snackbarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();
  }

  async ngOnInit() {
    // this.getInterviewList();
    this.filteredInterviewList = this.interviews;
    this.initFilter();
  }

  createJob() {
    this.router.navigate(['vaga/novo']);
  }

  // async getInterviewList() {
  //   try {
  //     this.filteredInterviewList = this.interviews = await this.interviewProvider.findAll();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

 

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe((res) => {
        this.filteredInterviewList = this.interviews.filter((interview) =>
          interview.nameCandidate
            .toLocaleLowerCase()
            .includes(this.filter.nativeElement.value.toLocaleLowerCase())
        );
      });
  }

  // async deleteInterview(interviewId: any) {
  //   try {
  //     const interviews = await this.interviewProvider.destroy(interviewId);
  //     this.getInterviewList();

  //     this.snackbarService.successMessage('Entrevista Apagada Com Sucesso');
  //   } catch (error) {
  //     console.log('ERROR 132' + error);
  //     this.snackbarService.showError('Falha ao Deletar');
  //   }
  // }

}
