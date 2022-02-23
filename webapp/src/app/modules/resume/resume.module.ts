import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ResumeRegisterTabComponent } from './resume-create/resume-register-tab/resume-register-tab.component';
import {
  ResumeEducationTabComponent,
} from './resume-create/resume-education-tab/resume-education-tab.component';
import {
  ResumeExperienceTabComponent,
} from './resume-create/resume-experience-tab/resume-experience-tab.component';
import {
  ResumeSkillsTabComponent,
} from './resume-create/resume-skills-tab/resume-skills-tab.component';
import { ResumeMonitoringTabComponent } from './resume-create/resume-monitoring-tab/resume-monitoring-tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ResumeCreateComponent } from './resume-create/resume-create.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { ResumeApplicationTabComponent } from './resume-create/resume-application-tab/resume-application-tab.component';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { ResumeSkillDialog } from './resume-create/resume-skills-tab/resume-skill.dialog.component';
import { ResumeDialogExperience } from './resume-create/resume-experience-tab/resume-experience-dialog.component';
import { ResumeEducationDialog } from './resume-create/resume-education-tab/resume-education-dialog.component';
import { ResumeLanguageDialog } from './resume-create/resume-education-tab/resume-language-dialog.component';

const routes: Routes = [
  {
    path: 'lista',
    component: ResumeListComponent,
  },
  {
    path: ':id',
    component: ResumeCreateComponent,
  },
];

@NgModule({
  declarations: [
    ResumeApplicationTabComponent,
    ResumeCreateComponent,
    ResumeRegisterTabComponent,
    ResumeEducationTabComponent,
    ResumeExperienceTabComponent,
    ResumeSkillsTabComponent,
    ResumeMonitoringTabComponent,
    ResumeDialogExperience,
    ResumeLanguageDialog,
    ResumeEducationDialog,
    ResumeSkillDialog,
    ResumeApplicationTabComponent,
    ResumeListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    NgxMaskModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatNativeDateModule,
    ScrollingModule,
    MatListModule,
    MatDatepickerModule,
  ],
  providers: [MatDatepickerModule],

  entryComponents: [
    ResumeApplicationTabComponent,
    ResumeCreateComponent,
    ResumeRegisterTabComponent,
    ResumeEducationTabComponent,
    ResumeExperienceTabComponent,
    ResumeSkillsTabComponent,
    ResumeMonitoringTabComponent,
    ResumeLanguageDialog,
    ResumeEducationDialog,
    ResumeSkillDialog,
  ],
})
export class ResumeModule {}
