import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenComponent } from './components/validate-token/validate-token.component';
import { FeedbackCreateComponent } from './modules/collaborator/feedback-create/feedback-create.component';
import { JobInterviewCreateComponent } from './modules/job/job-interview-create/job-interview-create.component';


const routes: Routes = [
  {
    path: '',

    redirectTo: '/colaborador/lista',

    pathMatch: 'full',
  },
  {
    path: 'colaborador',
    loadChildren: () =>
      import('./modules/collaborator/collaborator.module').then(
        m => m.CollaboratorModule
      ),
  },
  {
    path: 'validate/:id',
    component: ValidateTokenComponent,
  },
  {
    path: 'vaga',
    loadChildren: () =>
      import('./modules/job/job.module').then((m) => m.JobModule),
  },
  {
    path: 'curriculo',
    loadChildren: () =>
      import('./modules/resume/resume.module').then((m) => m.ResumeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
