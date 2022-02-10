import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingActiveDirectoryComponent } from './modules/setting/setting-create/setting-active-directory/setting-active-directory.component';
import { SettingEmailComponent } from './modules/setting/setting-create/setting-email/setting-email.component';

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
    path: 'setting',
    loadChildren: () =>
      import('./modules/setting/setting.module').then(
        (m) => m.SettingModule
      ),
  },
  { path: 'active-directory', component: SettingActiveDirectoryComponent },
  { path: 'email', component: SettingEmailComponent },

   ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
