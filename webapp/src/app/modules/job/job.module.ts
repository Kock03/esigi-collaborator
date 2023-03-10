import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  JobCreateComponent,
  JobDialogSkill,
} from './job-create/job-create.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatTreeModule} from '@angular/material/tree';
import { JobListComponent } from './job-list/job-list.component';

const routes: Routes = [
  {
    path: 'lista',
    component: JobListComponent

  },
  {
    path: 'novo',
    component: JobCreateComponent,
  },
];

@NgModule({
  declarations: [JobCreateComponent, JobDialogSkill, JobListComponent],
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
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTreeModule,
    HttpClientModule,
  ],
  providers: [
    MatDatepickerModule
  ],
  entryComponents: [
    JobDialogSkill
  ]
})
export class JobModule {}
