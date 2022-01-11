import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface document {
  name: string;
  link: string;
}

const ELEMENT_DATA: document[] = [{ name: 'RG', link: 'Abrir' }];

@Component({
  selector: 'app-collaborator-document-tab',
  templateUrl: './collaborator-document-tab.component.html',
  styleUrls: ['./collaborator-document-tab.component.scss'],
})
export class CollaboratorDocumentTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['name', 'link', 'icon'];
  dataSource = ELEMENT_DATA;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
