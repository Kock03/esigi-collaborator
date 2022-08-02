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
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { CustomerProvider } from 'src/providers/customer.provider';
import { ProjectProvider } from 'src/providers/project.provider';

export interface Panel {
  project: string;
  paper: string;
  startDate: string;
  endDate: string;
  hoursRun: string;
  manager: string;
  client: string;
}

export interface ICollaborator{
  firstNameCorporateName: string;
  lastNameFantasyName: string;
}
export interface ICustomer{
corporateName: string;
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

  collaboratorId!: any;
  projects!: any[];
  manager!: any;
  customer!:ICustomer | any;

  filteredPanelList = new MatTableDataSource();

  constructor(private route: ActivatedRoute,
              private projectProvider: ProjectProvider, 
              private collaboratorProvider: CollaboratorProvider, 
              private customerProvider: CustomerProvider) { }

  async ngOnInit() {
    this.collaboratorId = this.route.snapshot.paramMap.get('id');
    this.getPanelList();
  }

  async getPanelList() {
    try {
       
      this.filteredPanelList.data = this.projects = await this.projectProvider.findByProject(this.collaboratorId);

    } catch (error) {
      console.error(error);
    }
  }

  getPaper(paper: number) {
    switch (paper) {
      case 1:
        return 'Gerente de Projeto';
      case 2:
        return 'Arquiteto de Software';
      case 3:
        return 'Analista de Dados';
      case 4:
        return 'Analista de Testes';
      case 5:
        return 'Engenheiro de Software';
      case 6:
        return 'Desenvolvedor Angular';
      case 7:
        return 'Desenvolvedor React';
      case 8:
        return 'Desenvolvedor C#';
      case 9:
        return 'Desenvolvedor Java';
      case 10:
        return 'Desenvolvedor PHP';
      case 11:
        return 'Desenvolvedor Node';
      case 12:
        return 'Desenvolvedor Javascript';
      case 13:
        return 'Desenvolvedor C++';
      case 14:
        return 'Desenvolvedor Python';
      case 15:
        return 'Desenvolvedor Ruby';
      default:
        return '';
    }
  }
}
