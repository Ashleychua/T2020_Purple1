import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PersonalMessages, User } from '../_models';
import {
  AlertService,
  AuthenticationService,
  AccountsService
} from '../_services';

@Component({
  selector: 'app-customer-messages',
  templateUrl: './customer-messages.component.html',
  styleUrls: ['./customer-messages.component.css']
})
export class CustomerMessagesComponent implements OnInit {
  panelOpenState = true;
  loading = false; // loading for data submission
  isLoading = true; // loading upon retrieving data for table
  currentUser: User;
  // personalMessages: PersonalMessages[];

  personalMessages = [
    {
      title: 'Gojek',
      description: 'Gojek Launch',
      dateTime: '2018-12-20',
      content: 'Free stuff'
    },
    {
      title: 'Test',
      description: '',
      dateTime: '2018-12-20',

      content: 'Content of subpanel 02'
    }
  ];

  marketingMessages = [
    {
      title: 'Gojek',
      description: 'Gojek Launch',
      dateTime: '2018-12-20',
      content: 'Free stuff'
    },
    {
      title: 'Test',
      description: '',
      dateTime: '2018-12-20',

      content: 'Content of subpanel 02'
    }
  ];

  accordions = [
    {
      title: 'Personal',
      description: '',
      subAccordion: this.personalMessages
    },
    {
      title: 'Marketing',
      description: '',
      subAccordion: this.marketingMessages
    }
  ];

  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private accountsService: AccountsService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
    this.getPersonalMessagesList();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.accordions, event.previousIndex, event.currentIndex);
  }

  getPersonalMessagesList() {
    this.accountsService.getPersonalMessages(this.currentUser.id).subscribe(
      (data: PersonalMessages[]) => {
        console.log(data);
      },
      error => {
        this.alertService.error('Could not retrieve the data requested');
      }
    );
  }
}
