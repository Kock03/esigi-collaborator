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
}

const skills: skill[] = [
  { name: 'Java', time: '2' },
  { name: 'C#', time: '2' },
  { name: 'Python', time: '2' },
  { name: 'Angular', time: '2' },
  { name: 'React', time: '2' },
  { name: 'NodeJS', time: '2' },
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

  displayedColumns: string[] = ['name', 'time'];
  dataSource = skills;

  constructor() {}

  ngOnInit(): void {}
}
