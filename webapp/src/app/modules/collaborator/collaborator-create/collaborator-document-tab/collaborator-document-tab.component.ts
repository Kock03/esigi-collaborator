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

export interface document {
  name: string;
  file: string;
}

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
  documents: document[] = [
    {
      name: 'RG',
      file: '',
    },
  ];

  selectedIndex = 0;
  documentForm!: FormGroup;
  index: any = null;
  Document: any;

  get documentArray() {
    return this.collaboratorForm.controls['Documents'] as FormArray;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForm();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CollaboratorDocumentDialog, {
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((document) => {
      console.log(
        '🚀 ~ file: collaborator-document-tab.component.ts ~ line 60 ~ CollaboratorDocumentTabComponent ~ dialogRef.afterClosed ~ document',
        document
      );
      if (document) {
        this.documentArray.insert(0, this.fb.group(document));
        this.documentTable.renderRows();
      }
    });
  }

  initForm(): void {
    this.documentForm = this.fb.group({
      name: [''],
      file: [''],
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

@Component({
  selector: 'collaborator-document-dialog',
  templateUrl: 'collaborator-document-dialog.html',
  styleUrls: ['./collaborator-document-tab.component.scss'],
})
export class CollaboratorDocumentDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  documentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CollaboratorDocumentDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { documentSelected: any }
  ) {}



  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.documentForm = this.fb.group({
      name: ['RG', Validators.required],
      file: [''],
    });

    if (this.data && this.data.documentSelected) {
      this.documentForm.patchValue(this.data.documentSelected);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async save() {
    this.dialogRef.close(this.documentForm.getRawValue());
  }
}
