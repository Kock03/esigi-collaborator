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
import { MatTable } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CollaboratorSkillDialog } from './collaborator-skill-dialog.component';

@Component({
  selector: 'app-collaborator-skill-tab',
  templateUrl: './collaborator-skill-tab.component.html',
  styleUrls: ['./collaborator-skill-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorSkillTabComponent implements OnInit {
  @Input('skillArray') skillArray!: FormArray;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('skillTable') skillTable!: MatTable<any>;

  displayedColumns: string[] = ['technology', 'time', 'level', 'icon'];

  data: [] = [];

  selectedIndex: number = 0;
  skillForm!: FormGroup;
  index: any = null;
  Skill: any;
  checked = false;

 
  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

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
    const dialogRef = this.dialog.open(CollaboratorSkillDialog, {
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
    const dialogRef = this.dialog.open(CollaboratorSkillDialog, {
      width: '500px',
      height: '620px',
      data: skillSelected ,
    });

    this.index = index;
    dialogRef.afterClosed().subscribe((skill) => {
      if (skill) {
        this.skillArray.controls[this.index].patchValue(skill);
      }
    });
  }

  deleteSkill(index: number) {
    this.skillArray.removeAt(index);
  }
}
