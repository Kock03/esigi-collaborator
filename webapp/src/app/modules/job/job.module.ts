import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCreateComponent } from './job-create/job-create.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatTreeModule } from '@angular/material/tree';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobDetailListTabComponent } from './job-detail/job-detail-list-tab/job-detail-list-tab.component';
import { JobPanelTabComponent } from './job-detail/job-panel-tab/job-panel-tab.component';
import { NgxMaskModule } from 'ngx-mask';
import {
  JobRegisterTabComponent,
  PickDateAdapter,
} from './job-create/job-register-tab/job-register-tab.component';
import { JobSkillTabComponent } from './job-create/job-skill-tab/job-skill-tab.component';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { JobDialogSkill } from './job-create/job-skill-tab/job-skill-dialog.component';
import { JobInterviewCreateComponent } from './job-interview-create/job-interview-create.component';
import { MatSortModule } from '@angular/material/sort';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'lista',
    component: JobListComponent,
  },
  {
    path: ':id',
    component: JobCreateComponent,
  },
  {
    path: 'detalhe/:id',
    component: JobDetailComponent,
  },

  { path: 'interview/:id', component: JobInterviewCreateComponent },
];

@NgModule({
  declarations: [
    JobCreateComponent,
    JobDialogSkill,
    JobListComponent,
    JobDetailComponent,
    JobDetailListTabComponent,
    JobPanelTabComponent,
    JobRegisterTabComponent,
    JobSkillTabComponent,
    JobInterviewCreateComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
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
    MatListModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTreeModule,
    HttpClientModule,
    NgxMaskModule,
    MatSortModule,
  ],
  providers: [MatDatepickerModule, ConfirmDialogService],
  entryComponents: [
    JobDialogSkill,
    JobRegisterTabComponent,
    JobSkillTabComponent,
    JobInterviewCreateComponent,
  ],
})
export class JobModule {}
