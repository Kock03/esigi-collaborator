import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingCreateComponent } from './setting-create/setting-create.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SettingActiveDirectoryComponent } from './setting-create/setting-active-directory/setting-active-directory.component';
import { MatInputModule } from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import { SettingEmailComponent } from './setting-create/setting-email/setting-email.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  {
    path: 'novo',
    component: SettingCreateComponent,
  },
  {
    path: 'conexao',
    component: SettingActiveDirectoryComponent,
  },
  {
    path: 'criacao',
    component: SettingEmailComponent,
  },
];

@NgModule({
  declarations: [
  SettingCreateComponent,
  SettingActiveDirectoryComponent,
  SettingEmailComponent,
],

  imports: [
    CommonModule, RouterModule.forChild(routes),
    FlexLayoutModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,

  ],
  entryComponents: [
    SettingEmailComponent
  ],
})
export class SettingModule {}
