import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ResumeRegisterTabComponent } from './resume-create/resume-register-tab/resume-register-tab.component';
import { ResumeEducationDialog, ResumeEducationTabComponent, ResumeLanguageDialog } from './resume-create/resume-education-tab/resume-education-tab.component';
import { ResumeDialogExperience, ResumeExperienceTabComponent } from './resume-create/resume-experience-tab/resume-experience-tab.component';
import { ResumeSkillDialog, ResumeSkillsTabComponent } from './resume-create/resume-skills-tab/resume-skills-tab.component';
import { ResumeMonitoringTabComponent } from './resume-create/resume-monitoring-tab/resume-monitoring-tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ResumeCreateComponent } from './resume-create/resume-create.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatListModule} from '@angular/material/list';


const routes: Routes = [
  {
    path: 'novo',
    component: ResumeCreateComponent,
  },
];

@NgModule({
  declarations: [
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
    ScrollingModule,
    MatListModule,
  ],

  entryComponents: [
    ResumeCreateComponent,
    ResumeRegisterTabComponent,
    ResumeEducationTabComponent,
    ResumeExperienceTabComponent,
    ResumeSkillsTabComponent,
    ResumeMonitoringTabComponent,
    ResumeLanguageDialog,
    ResumeEducationDialog,
    ResumeSkillDialog
    
  ],
})
export class ResumeModule {}
