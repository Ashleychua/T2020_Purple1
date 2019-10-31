import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  AlertService,
  UserService,
  AccountsService
} from '../_services';
import { User, UserDetails } from '../_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  details: UserDetails;
  lastLogin: string;
  dateOfBirth: string;

  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private userService: UserService,
    private accountsService: AccountsService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
    this.getDetails(this.currentUser.id);
  }

  ngOnInit() {}

  getDetails(custID: number) {
    this.accountsService.getCustDetails(custID).subscribe(
      (data: UserDetails) => {
        console.log(data);
        this.details = data;
        this.lastLogin = this.details.lastLogIn.substring(0, 10);
        this.dateOfBirth = this.details.dateOfBirth.substring(0, 10);
      },
      error => {
        this.alertService.error('Could not retrieve the data requested');
      }
    );
  }
}
