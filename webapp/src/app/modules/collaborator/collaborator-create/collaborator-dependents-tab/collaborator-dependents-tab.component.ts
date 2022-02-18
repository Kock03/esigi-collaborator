import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DocumentValidator } from 'src/app/validators/document.validator';
import {CollaboratorDependentsDialog } from './collaborator-dependents-dialog.component';

@Component({
  selector: 'app-collaborator-dependents-tab',
  templateUrl: './collaborator-dependents-tab.component.html',
  styleUrls: ['./collaborator-dependents-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorDependentsTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('dependentTable') dependentTable!: MatTable<any>;


  displayedDependents: string[] = [
    'type',
    'firstName',
    'gender',
    'cpf',
    'birthDate',
    'phoneNumber',
    'email',
    'icon',
  ];

  data: [] = [];
  dependentForm!: FormGroup;

  index: any = null;
  Dependent: any;

  get dependentArray() {
    return this.collaboratorForm.controls['Dependents'] as FormArray;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (
      this.dependentArray.value.findIndex(
        (dependent: any) => dependent == null
      ) === -1
    ) {
      this.data = this.dependentArray.value;
    }

    this.initObservables();
  }

  initObservables() {
    this.dependentArray.valueChanges.subscribe((res) => {
      const isNullIndex = this.dependentArray.value.findIndex(
        (dependent: any) => dependent == null
      );
      if (isNullIndex !== -1) {
        this.dependentArray.removeAt(isNullIndex);
      }
      if (res) {
        this.data = this.dependentArray.value;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CollaboratorDependentsDialog, {
      width: '500px',
      height: '650px',
    });

    dialogRef.afterClosed().subscribe((dependent) => {
      if (dependent) {
        this.dependentArray.insert(0, this.fb.group(dependent));
        this.dependentTable.renderRows();
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

  getDependents(dependentsSelected: any, index: number) {
    const dialogRef = this.dialog.open(CollaboratorDependentsDialog, {
      width: '500px',
      height: '650px',
      data: { dependentsSelected },
    });
    this.index = index;
    dialogRef.afterClosed().subscribe((dependent) => {
      this.dependentArray.controls[this.index].setValue(dependent);
    });
  }

  deleteDependents(index: number) {
    this.dependentArray.removeAt(index);
  }
}

