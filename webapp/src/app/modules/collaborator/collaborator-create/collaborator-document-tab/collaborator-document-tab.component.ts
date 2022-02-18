import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CollaboratorDocumentDialog } from './collaborator-document-dialog.component';

@Component({
  selector: 'app-collaborator-document-tab',
  templateUrl: './collaborator-document-tab.component.html',
  styleUrls: ['./collaborator-document-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorDocumentTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('documentTable') documentTable!: MatTable<any>;

  displayedColumns: string[] = ['name', 'file', 'icon'];

  selectedIndex = 0;
  documentForm!: FormGroup;
  index: any = null;
  Document: any;
  data: [] = [];

  get documentArray() {
    return this.collaboratorForm.controls['Documents'] as FormArray;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (
      this.documentArray.value.findIndex(
        (document: any) => document == null
      ) === -1
    ) {
      this.data = this.documentArray.value;
    }

    this.initObservables();
  }

  initObservables() {
    this.documentArray.valueChanges.subscribe((res) => {
      const isNullIndex = this.documentArray.value.findIndex(
        (document: any) => document == null
      );
      if (isNullIndex !== -1) {
        this.documentArray.removeAt(isNullIndex);
      }
      if (res) {
        this.data = this.documentArray.value;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CollaboratorDocumentDialog, {
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((document) => {
      if (document) {
        this.documentArray.insert(0, this.fb.group(document));
        this.documentTable.renderRows();
      }
    });
  }

  getDocument(documentSelected: any, index: number) {
    const dialogRef = this.dialog.open(CollaboratorDocumentDialog, {
      width: '500px',
      height: '300px',
      data: { documentSelected },
    });

    this.index = index;
    dialogRef.afterClosed().subscribe((document) => {
      this.documentArray.controls[this.index].setValue(document);
    });
  }

  deleteDocument(index: number) {
    this.documentArray.removeAt(index);
  }
}
