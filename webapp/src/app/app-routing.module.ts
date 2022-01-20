import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/curriculo/novo',
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
    path: 'curriculo',
    loadChildren: () =>
      import('./modules/resume/resume.module').then(
        (m) => m.ResumeModule
      ),
  },

   ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
