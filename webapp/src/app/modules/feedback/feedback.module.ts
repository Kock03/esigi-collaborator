import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';

import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';


const routes: Routes = [
  {
    path: 'novo',
    component: FeedbackCreateComponent,
  },
];

@NgModule({
  declarations: [
    FeedbackCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskModule,
    FlexLayoutModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  providers: [
    MatDatepickerModule
  ],
})
export class FeedbackModule { }
