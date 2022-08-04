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
import { CollaboratorDocumentProvider } from 'src/providers/collaborator-providers/collaborator-document.provider';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { CollaboratorDocumentDialog } from './collaborator-document-dialog.component';

@Component({
  selector: 'app-collaborator-document-tab',
  templateUrl: './collaborator-document-tab.component.html',
  styleUrls: ['./collaborator-document-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorDocumentTabComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('documentTable') documentTable!: MatTable<any>;

  displayedColumns: string[] = ['name', 'file', 'icon'];

  selectedIndex = 0;
  documentForm!: FormGroup;
  Document: any;
  data: [] = [];
  method!: string;
  collaboratorId!: any;
  documentId!: string;
  collaboratorMethod!: string;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogService: ConfirmDialogService,
    private collaboratorDocumentProvider: CollaboratorDocumentProvider,
    private snackbarService: SnackBarService,   
    private collaboratorProvider: CollaboratorProvider,
  ) {}

  ngOnInit(): void {
    this.collaboratorMethod = sessionStorage.getItem('collaborator_method')!;
    if (this.collaboratorMethod === 'edit') {
      this.getDocumentList();
    }
  }

  async getDocumentList() {
    this.collaboratorId = sessionStorage.getItem('collaborator_id');
    const data = await this.collaboratorProvider.findOne(this.collaboratorId);
    this.data = data.Documents;
  }



  openDialog() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(CollaboratorDocumentDialog, {
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(async document => {
      if (document) {
        await this.getDocumentList();
      }
    });
  }

  getDocument(documentSelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.documentId = id;
    sessionStorage.setItem('document_id', this.documentId);
    const dialogRef = this.dialog.open(CollaboratorDocumentDialog, {
      width: '500px',
      height: '300px',
      data: documentSelected,
    });


    dialogRef.afterClosed().subscribe(async document => {
      if (document) {
        await this.getDocumentList();
      }
    });
  }

  deleteDocument(id: string) {
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
        try {
          let deleteDocument = await this.collaboratorDocumentProvider.destroy(id);
          this.getDocumentList();
          this.snackbarService.successMessage('Registro Excluido Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
        }
      }
    });
  }
}
