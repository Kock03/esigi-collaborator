import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',

    redirectTo: '/vaga/lista',

    pathMatch: 'full',
  },

  {
    path: 'colaborador',
    loadChildren: () =>
      import('./modules/collaborator/collaborator.module').then(
        (m) => m.CollaboratorModule
      ),
  },

  {

    path: 'vaga',
    loadChildren: () =>
    import('./modules/job/job.module').then(
      (m) => m.JobModule
    ),
  },

   {
    path: 'curriculo',
    loadChildren: () =>
      import('./modules/resume/resume.module').then(
        (m) => m.ResumeModule
      ),
  },

  {

    path: 'feedback',
    loadChildren: ()=>
      import('./modules/feedback/feedback.module').then(
        (m) => m.FeedbackModule
      ),

  }

   ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
