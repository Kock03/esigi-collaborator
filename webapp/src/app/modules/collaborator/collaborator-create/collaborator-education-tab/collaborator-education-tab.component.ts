import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { CollaboratorEducationDialog } from './collaborator-education-dialog.component';
import { CollaboratorLanguageDialog } from './collaborator-language-dialog.component';

@Component({
  selector: 'app-collaborator-education-tab',
  templateUrl: './collaborator-education-tab.component.html',
  styleUrls: ['./collaborator-education-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorEducationTabComponent implements OnInit {
  @Input('educationArray') educationArray!: FormArray;
  @Input('languageArray') languageArray!: FormArray;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('languageTable') languageTable!: MatTable<any>;
  @ViewChild('educationTable') educationTable!: MatTable<any>;

  dataLanguage: [] = [];

  dataEducation: [] = [];

  displayedEducation: string[] = [
    'schooling',
    'situation',
    'course',
    'institution',
    'icon',
  ];

  displayedLanguage: string[] = ['language', 'fluency', 'icon'];

  selectedIndex: number = 0;

  educationForm!: FormGroup;
  languageForm!: FormGroup;

  index: any = null;
  Language: any;
  languageList: any = [];
  Education: any;
  educationList: any = [];

  constructor(
    private dialogService: ConfirmDialogService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.initObservables();
  }

  openDialogLanguage() {
    const dialogRef = this.dialog.open(CollaboratorLanguageDialog, {
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((language) => {
      if (language) {
        this.languageArray.insert(0, this.fb.group(language));
        this.languageTable.renderRows();
      }
    });
  }

  openDialogEducation() {
    const dialogRef = this.dialog.open(CollaboratorEducationDialog, {
      width: '500px',
      height: '470px',
    });

    dialogRef.afterClosed().subscribe((education) => {
      if (education) {
        this.educationArray.insert(0, this.fb.group(education));
        this.educationTable.renderRows();
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

  getLanguage(languageSelected: any, index: number) {
    const dialogRef = this.dialog.open(CollaboratorLanguageDialog, {
      width: '500px',
      height: '300px',
      data: { languageSelected },
    });

    this.index = index;
    dialogRef.afterClosed().subscribe((language) => {
      if (language) {
        this.languageArray.controls[this.index].setValue(language);
      }
    });
  }

  deleteLanguage(index: number) {
    const options = {
      data: {
        title: 'Anteção',
        subtitle: 'Você tem certeza que deseja excluir essas informações?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async (confirmed) => {
      if (confirmed) {
        this.languageArray.removeAt(index);
      }
    });
  }

  getEducation(educationSelected: any, index: number) {
    const dialogRef = this.dialog.open(CollaboratorEducationDialog, {
      width: '500px',
      height: '470px',
      data: { educationSelected },
    });

    this.index = index;
    dialogRef.afterClosed().subscribe((education) => {
      if (education) {
        this.educationArray.controls[this.index].setValue(education);
      }
    });
  }

  deleteEducation(index: number) {
    const options = {
      data: {
        title: 'Anteção',
        subtitle: 'Você tem certeza que deseja excluir essas informações?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async (confirmed) => {
      if (confirmed) {
        this.educationArray.removeAt(index);
      }
    });
  }

  getLabel(label: string, element: any) {
    if (!element) {
      return;
    }
    switch (label) {
      case 'schooling':
        return element.schooling == 1
          ? 'Ensino Fundamental'
          : element.schooling == 2
          ? 'Ensino Médio'
          : 'Ensino Superior';
      case 'situation': {
        return element.situation == 1
          ? 'Parado'
          : element.situation == 2
          ? 'Completo'
          : 'Em andamento';
      }
      default:
        return;
    }
  }
}
