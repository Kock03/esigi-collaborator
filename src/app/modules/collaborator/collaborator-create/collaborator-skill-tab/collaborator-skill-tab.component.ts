import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface skill {
  name: string;
  time: string;
  level: string;
}

const skills: skill[] = [
  { name: 'Java', time: '2', level: 'senior' },
  { name: 'C#', time: '2', level: 'senior' },
  { name: 'Python', time: '2', level: 'senior' },
  { name: 'Angular', time: '2', level: 'senior' },
  { name: 'React', time: '2' , level: 'senior'},
  { name: 'NodeJS', time: '2', level: 'senior' },
];

@Component({
  selector: 'app-collaborator-skill-tab',
  templateUrl: './collaborator-skill-tab.component.html',
  styleUrls: ['./collaborator-skill-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorSkillTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['name', 'time', 'level' , 'icon'];
  dataSource = skills;

  constructor() {}

  ngOnInit(): void {}

  next() {
    this.onChange.next(true);
  }
}
