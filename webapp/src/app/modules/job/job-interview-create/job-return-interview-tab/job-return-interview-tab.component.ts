import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewsProvider } from 'src/providers/interview.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { ReturnProvider } from 'src/providers/return.provider';

@Component({
  selector: 'app-job-return-interview-tab',
  templateUrl: './job-return-interview-tab.component.html',
  styleUrls: ['./job-return-interview-tab.component.scss']
})
export class JobReturnInterviewTabComponent implements OnInit {
  returnForm!: FormGroup;
  jobId!: any;
  interviewId!: string | null;
  interview: any;
  selectedIndex: number = 0;

  constructor(private fb: FormBuilder,
    private ReturnProvider: ReturnProvider,
    private interviewsProvider: InterviewsProvider,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
    private router: Router,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;

    this.jobId = state;
  }

  ngOnInit(): void {
    this.interviewId = this.route.snapshot.paramMap.get('id');
    if (this.jobId !== undefined) {
      sessionStorage.setItem('job_id', this.jobId.id);
    }

    if (this.interviewId !== 'novo') {
      this.initForm();
      this.interview = this.interviewsProvider.findOne(this.interviewId);
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.returnForm = this.fb.group({
      nameCandidate: ['', Validators.required],
      dateOfReturn: this.fb.control({ value: ' ', disabled: false }, [DocumentValidator.isValidData(), Validators.required]),
      technicalEvaluation: [1, Validators.required],
      behavioralEvaluation: [1, Validators.required],
      technicalEvaluationComent: ['', Validators.required],
      behavioralEvaluationComent: ['', Validators.required],
      returnOfCandidate: [true, Validators.required],
      reason: [1, Validators.required],
      typeOdContract: [1, Validators.required],
      combinedValue: ['', Validators.required],
      initialData: this.fb.control({ value: new Date().toLocaleDateString(), disabled: false }, [DocumentValidator.isValidData(), Validators.required]),
  });
  }

  async saveReturns() {
    let data = this.returnForm.getRawValue();

    try {
        await this.ReturnProvider.store(data);

        this.snackbarService.successMessage('Retorno Cadastrada Com Sucesso');
        const jobId = sessionStorage.getItem('job_id');
        this.router.navigate([`vaga/detalhe/${jobId}`]);
        sessionStorage.removeItem('job_id');
    } catch (error) {
        console.log('ERROR 132' + error);
        this.snackbarService.showError('Falha ao Cadastrar');
    }
}
}
