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
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { ResumeSkillDialog } from './resume-skill.dialog.component';

@Component({
  selector: 'app-resume-skills-tab',
  templateUrl: './resume-skills-tab.component.html',
  styleUrls: ['./resume-skills-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeSkillsTabComponent implements OnInit {
  @Input('skillArray') skillArray!: FormArray;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('skillTable') skillTable!: MatTable<any>;

  displayedColumns: string[] = ['name', 'time', 'level', 'icon'];

  data: [] = [];

  selectedIndex: number = 0;
  skillForm!: FormGroup;
  index: any = null;
  Skill: any;
  checked = false;


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogService: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    if (this.skillArray.value.length > 0) {
      this.data = this.skillArray.value;
    }

    this.initObservables();
  }

  initObservables() {
    this.skillArray.valueChanges.subscribe((res) => {
      const isNullIndex = this.skillArray.value.findIndex(
        (skill: any) => skill == null
      );
      if (isNullIndex !== -1) {
        this.skillArray.removeAt(isNullIndex);
      }
      if (res) {
        this.data = this.skillArray.value;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ResumeSkillDialog, {
      width: '500px',
      height: '470px',
    });

    dialogRef.afterClosed().subscribe((skill) => {
      if (skill) {
        this.skillArray.insert(0, this.fb.group(skill));
        this.skillTable.renderRows();
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

  getSkill(skillSelected: any, index: number) {
    const dialogRef = this.dialog.open(ResumeSkillDialog, {
      width: '500px',
      height: '450px',
      data: skillSelected,
    });

    this.index = index;
    dialogRef.afterClosed().subscribe((skill) => {
      if (skill) {
        this.skillArray.controls[this.index].patchValue(skill);
      }
    });
  }

  deleteSkill(index: number) {
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
        this.skillArray.removeAt(index);
      }
    });
  }
}
