import { formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICollaborator } from 'src/app/interfaces/icollaborator';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CollaboratorPanelModel } from 'src/models/collaborator-panel-model';
import { CustomerProvider } from 'src/providers/customer.provider';

@Component({
  selector: 'app-job-register-tab',
  templateUrl: './job-register-tab.component.html',
  styleUrls: ['./job-register-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobRegisterTabComponent implements OnInit {
  @Input('form') jobForm!: FormGroup;
  @Input('collaborator') collaboratorControl!: FormControl;
  @Input('customer') customerControl!: FormControl;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild('fiilter', { static: true }) fiilter!: ElementRef;

  date: any;
  method: any;

  collaborators!:  any[];
  filteredCollaborators!: any[];
  filteredCollaboratorList: any;
  collaborator!: any;
  collaboratorValid: boolean = false;

  customers!:  any[];
  filteredCustomers!: any[];
  filteredCustomerList: any;
  customer!: any;
  customerValid: boolean = false;

  constructor(private collaboratorProvider: CollaboratorProvider, private customerProvider: CustomerProvider) {}

  ngOnInit(){
    const customeer = sessionStorage.getItem('customer_name')
    this.method =  sessionStorage.getItem('method');
    if(this.method == 'edit'){
     this.displayFnCustomer(customeer);
    }
    this.getCollaboratorList();
    this.getCustomerList();
    this.initFilterRequester();
    this.initFilterCustomer();
  }

  async getCollaboratorList() {
    this.filteredCollaboratorList=this.collaborators =
      await this.collaboratorProvider.findGerente();
  }
  async getCustomerList() {
    this.filteredCustomerList=this.customers =
      await this.customerProvider.shortListCustomers();
  }

  private initFilterRequester() {
    this.collaboratorControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filterRequester(res);
        if (res && res.id) {
          this.collaboratorValid = true;
        } else {
          this.collaboratorValid = false;
        }
        
      });

  }

  private initFilterCustomer() {
      this.customerControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filterCustomer(res);
        if (res && res.id) {
          this.customerValid = true;
        } else {
          this.customerValid = false;
        }
        
      });

  }

  displayFnRequester(user: any): string {
    if (typeof user === 'string' && this.collaborators) {
      return this.collaborators.find(
        (collaborator) => collaborator.id === user
      );
    }
    return user && user.firstNameCorporateName && user.lastNameFantasyName
      ? user.firstNameCorporateName + ' ' + user.lastNameFantasyName
      : '';
  }

  displayFnCustomer(user: any): string {
    if (typeof user === 'string' && this.customers) {
      return this.customers.find(
        (customer) => customer.id === user
      );
    }
    return user && user.corporateName
      ? user.corporateName 
      : '';
  }

  private async _filterRequester(name: string): Promise<void> {
    const params = `firstNameCorporateName=${name}`;
    this.filteredCollaborators = await this.collaboratorProvider.findByNameGerente(
      params
    );

  }

  
  private async _filterCustomer(name: string): Promise<void> {
    const params = `corporateName=${name}`;
    this.filteredCustomers = await this.customerProvider.findByName(
      params
    );

  }
}
