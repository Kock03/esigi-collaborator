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
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { CollaboratorDependentsDialog } from './collaborator-dependents-dialog.component';

@Component({
  selector: 'app-collaborator-dependents-tab',
  templateUrl: './collaborator-dependents-tab.component.html',
  styleUrls: ['./collaborator-dependents-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorDependentsTabComponent implements OnInit {
  @Input() dependentsArray!: FormArray;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
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

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogService: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    if (this.dependentsArray.value.length > 0) {
      this.data = this.dependentsArray.value;
    }

    this.initObservables();
  }

  initObservables() {
    this.dependentsArray.valueChanges.subscribe(res => {
      const isNullIndex = this.dependentsArray.value.findIndex(
        (dependent: any) => dependent == null
      );
      if (isNullIndex !== -1) {
        this.dependentsArray.removeAt(isNullIndex);
      }
      if (res) {
        this.data = this.dependentsArray.value;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CollaboratorDependentsDialog, {
      width: '500px',
      height: '650px',
    });

    dialogRef.afterClosed().subscribe(dependent => {
      if (dependent) {
        this.dependentsArray.insert(0, this.fb.group(dependent));
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
      data: dependentsSelected,
    });
    this.index = index;
    dialogRef.afterClosed().subscribe(dependent => {
      if (dependent) {
        this.dependentsArray.controls[this.index].patchValue(dependent);
      }
    });
  }

  deleteDependents(index: number) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir essas informações?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async confirmed => {
      if (confirmed) {
        this.dependentsArray.removeAt(index);
      }
    });
  }
}
