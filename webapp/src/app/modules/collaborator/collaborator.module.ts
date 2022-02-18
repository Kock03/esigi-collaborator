import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import {
  CollaboratorBankDialog,
  CollaboratorBankTabComponent,
} from './collaborator-create/collaborator-bank-tab/collaborator-bank-tab.component';
import {
  CollaboratorFinanceDialog,
  CollaboratorFinanceTabComponent,
} from './collaborator-create/collaborator-finance-tab/collaborator-finance-tab.component';
import { CollaboratorPanelTabComponent } from './collaborator-create/collaborator-panel-tab/collaborator-panel-tab.component';
import {
  CollaboratorSkillDialog,
  CollaboratorSkillTabComponent,
} from './collaborator-create/collaborator-skill-tab/collaborator-skill-tab.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CollaboratorEducationTabComponent } from './collaborator-create/collaborator-education-tab/collaborator-education-tab.component';
import {
  CollaboratorDocumentDialog,
  CollaboratorDocumentTabComponent,
} from './collaborator-create/collaborator-document-tab/collaborator-document-tab.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CollaboratorFeedbackTabComponent } from './collaborator-create/collaborator-feedback-tab/collaborator-feedback-tab.component';
import { CollaboratorDependentsTabComponent } from './collaborator-create/collaborator-dependents-tab/collaborator-dependents-tab.component';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { CollaboratorListComponent } from './collaborator-list/collaborator-list.component';
import { CollaboratorDependentsDialog } from './collaborator-create/collaborator-dependents-tab/collaborator-dependents-dialog.component';
import { CollaboratorEducationDialog } from './collaborator-create/collaborator-education-tab/collaborator-education-dialog.component';
import { CollaboratorLanguageDialog } from './collaborator-create/collaborator-education-tab/collaborator-language-dialog.component';

const routes: Routes = [
  {
    path: 'lista',
    component: CollaboratorListComponent,
  },
  {
    path: ':id',
    component: CollaboratorCreateComponent,
  },
  {
    path: 'feedback/novo',
    component: FeedbackCreateComponent,
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
    CollaboratorLanguageDialog,
    CollaboratorEducationDialog,
    CollaboratorBankDialog,
    CollaboratorFinanceDialog,
    CollaboratorSkillDialog,
    CollaboratorDocumentDialog,
    CollaboratorFeedbackTabComponent,
    CollaboratorDependentsTabComponent,
    CollaboratorDependentsDialog,
    FeedbackCreateComponent,
    CollaboratorListComponent,
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
    MatDatepickerModule,
    MatTableModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatIconModule,
    HttpClientModule,
    NgxMaskModule,
    MatDialogModule,
  ],
  entryComponents: [
    CollaboratorRegisterTabComponent,
    CollaboratorBankTabComponent,
    CollaboratorFinanceTabComponent,
    CollaboratorPanelTabComponent,
    CollaboratorSkillTabComponent,
    CollaboratorEducationTabComponent,
    CollaboratorDocumentTabComponent,
    CollaboratorLanguageDialog,
    CollaboratorEducationDialog,
    CollaboratorBankDialog,
    CollaboratorFinanceDialog,
    CollaboratorSkillDialog,
    CollaboratorDocumentDialog,
    CollaboratorFeedbackTabComponent,
    CollaboratorDependentsTabComponent,
    CollaboratorDependentsDialog,
    CollaboratorListComponent,
    FeedbackCreateComponent,
  ],
  providers: [MatDatepickerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CollaboratorModule {}
