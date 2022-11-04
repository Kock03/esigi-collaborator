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
  @Input('replace') collaboratorReplaceControl!: FormControl;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild('fiilter', { static: true }) fiilter!: ElementRef;
  @ViewChild('fiiilter', { static: true }) fiiilter!: ElementRef;

  date: any;
  method: any;

  collaborators!: any[];
  filteredCollaborators!: any[];
  filteredCollaboratorList: any;
  collaborator!: any;
  collaboratorValid: boolean = false;

  customers!: any[];
  filteredCustomers!: any[];
  filteredCustomerList: any;
  customer!: any;
  customerValid: boolean = false;

  replacements!: any[];
  filteredReplacements!: any[];
  filteredReplacementList: any;
  replacement!: any;
  replacementValid: boolean = false;

  constructor(private collaboratorProvider: CollaboratorProvider, private customerProvider: CustomerProvider) { }

  ngOnInit() {
    const customeer = sessionStorage.getItem('customer_name')
    this.method = sessionStorage.getItem('job_method');
    this.getCollaboratorList();
    this.getCustomerList();
    this.getReplacementList();
    this.initFilterRequester();
    this.initFilterCustomer();
    this.initFilterReplacement();
  }

  async getCollaboratorList() {
    this.filteredCollaboratorList = this.collaborators =
      await this.collaboratorProvider.findGerente();
  }
  async getCustomerList() {
    this.filteredCustomerList = this.customers =
      await this.customerProvider.shortListCustomers();
  }

  async getReplacementList() {
    this.filteredReplacementList = this.replacements =
      await this.collaboratorProvider.findActive();
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
    console.log("🚀 ~ file: job-register-tab.component.ts ~ line 96 ~ JobRegisterTabComponent ~ initFilterRequester ~ collaboratorControl", this.collaboratorControl)

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

  private initFilterReplacement() {
    this.collaboratorReplaceControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filterReplacement(res);
        if (res && res.id) {
          this.replacementValid = true;
        } else {
          this.replacementValid = false;
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


  displayFnReplacement(user: any): string {
    console.log("🚀 ~ file: job-register-tab.component.ts ~ line 159 ~ JobRegisterTabComponent ~ displayFnReplacement ~ replacements", this.replacements)
    if (typeof user === 'string' && this.replacements) {
      return this.replacements.find(
        
        (collaborator) => collaborator.id === user
      );
    }
    return user && user.firstNameCorporateName && user.lastNameFantasyName
      ? user.firstNameCorporateName + ' ' + user.lastNameFantasyName
      : '';

  }

  private async _filterRequester(name: string): Promise<void> {
    const params = `firstNameCorporateName=${name}`;
    this.filteredCollaborators = await this.collaboratorProvider.findAll(
      
    );
  }



  private async _filterCustomer(name: string): Promise<void> {
    const data = {
      corporateName: name,
      status: 1,
    };
    this.filteredCustomers = await this.customerProvider.findByName(
      data
    );

  }

  private async _filterReplacement(name: string): Promise<void> {
    const data = {
      firstNameCorporateName: name,
      status: 2,
    };
    this.filteredReplacements = await this.collaboratorProvider.findByName(
      data
    );

  }


}
