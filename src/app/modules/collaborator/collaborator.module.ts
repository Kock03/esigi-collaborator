import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaboratorCreateComponent } from './collaborator-create/collaborator-create.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CollaboratorRegisterTabComponent } from './collaborator-create/collaborator-register-tab/collaborator-register-tab.component';
import { MatSelectModule } from '@angular/material/select';
import { CollaboratorBankTabComponent } from './collaborator-create/collaborator-bank-tab/collaborator-bank-tab.component';
import { CollaboratorFinanceTabComponent } from './collaborator-create/collaborator-finance-tab/collaborator-finance-tab.component';
import { CollaboratorPanelTabComponent } from './collaborator-create/collaborator-panel-tab/collaborator-panel-tab.component';
import { CollaboratorSkillTabComponent } from './collaborator-create/collaborator-skill-tab/collaborator-skill-tab.component';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';

const routes: Routes = [
  {
    path: 'novo',
    component: CollaboratorCreateComponent,
  },
];

@NgModule({
  declarations: [
    CollaboratorCreateComponent,
    CollaboratorRegisterTabComponent,
    CollaboratorBankTabComponent,
    CollaboratorFinanceTabComponent,
    CollaboratorPanelTabComponent,
    CollaboratorSkillTabComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule
  ],
  entryComponents: [
    CollaboratorRegisterTabComponent,
    CollaboratorBankTabComponent,
    CollaboratorFinanceTabComponent,
    CollaboratorPanelTabComponent,
    CollaboratorSkillTabComponent,
  ],
})
export class CollaboratorModule {}
