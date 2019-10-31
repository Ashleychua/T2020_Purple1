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
  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private userService: UserService,
    private accountsService: AccountsService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {}

  getDetails(custID: number) {
    this.accountsService.getCustDetails(custID).subscribe(
      (data: UserDetails) => {
        console.log(data);
        this.details = data;
      },
      error => {
        this.alertService.error('Could not retrieve the data requested');
      }
    );
  }
}
