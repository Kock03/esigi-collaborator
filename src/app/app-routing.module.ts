import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/colaborador/novo',
    pathMatch: 'full',
  },

  {
    path: 'colaborador',
    loadChildren: () =>
      import('./modules/collaborator/collaborator.module').then(
        (m) => m.CollaboratorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
