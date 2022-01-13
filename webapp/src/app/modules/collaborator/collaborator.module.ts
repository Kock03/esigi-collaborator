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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CollaboratorEducationTabComponent } from './collaborator-create/collaborator-education-tab/collaborator-education-tab.component';
import { CollaboratorDocumentTabComponent } from './collaborator-create/collaborator-document-tab/collaborator-document-tab.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

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
    CollaboratorEducationTabComponent,
    CollaboratorDocumentTabComponent,
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
    MatCheckboxModule,
    MatIconModule,
    HttpClientModule,
    NgxMaskModule,
  ],
  entryComponents: [
    CollaboratorRegisterTabComponent,
    CollaboratorBankTabComponent,
    CollaboratorFinanceTabComponent,
    CollaboratorPanelTabComponent,
    CollaboratorSkillTabComponent,
    CollaboratorEducationTabComponent,
    CollaboratorDocumentTabComponent,
  ],
})
export class CollaboratorModule {}
