import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';

export interface Panel {
  project: string;
  paper: string;
  startDate: string;
  endDate: string;
  hoursRun: string;
  manager: string;
  client: string;
}
@Component({
  selector: 'app-collaborator-panel-tab',
  templateUrl: './collaborator-panel-tab.component.html',
  styleUrls: ['./collaborator-panel-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorPanelTabComponent implements OnInit {
  @ViewChild('panelTable') panelTable!: MatTable<any>;
  displayedPanel: string[] = [
    'project',
    'paper',
    'startDate',
    'endDate',
    'hoursRun',
    'manager',
    'client',
  ];
  panels: Panel[] = [
    {
      project: 'MariSol',
      paper: 'Programador',
      startDate: '13/05/2022',
      endDate: 'indefinido',
      hoursRun: '7 horas',
      manager: 'Danilo',
      client: 'Mari',
    },
  ];

  filteredPanelList!: any[];

  // constructor(private router: Router, private panelProvider: any) { }

  async ngOnInit() {
    //this.getPanelList();
  }

  // async getPanelList() {
  //   try {
  //     this.filteredPanelList = this.panel = await this.panelProvider.findAll();
  //   } catch (error) {
  //     console.error(error);
  //   }
}
