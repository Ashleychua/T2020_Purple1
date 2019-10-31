import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User, Transactions, CreditAccounts } from '../_models';
import {
  AlertService,
  AccountsService,
  AuthenticationService
} from '../_services';

@Component({
  selector: 'app-credit-accounts',
  templateUrl: './credit-accounts.component.html',
  styleUrls: ['./credit-accounts.component.css'],
  providers: [AccountsService]
})
export class CreditAccountsComponent implements OnInit {
  loading = false; // loading for data submission
  isLoading = true; // loading upon retrieving data for table
  currentUser: User;
  transactionsDetails: Transactions[];
  creditAccounts: CreditAccounts[];
  dataSource = new MatTableDataSource<Transactions>();
  displayedColumns: string[] = [
    'transactionId',
    'accountId',
    'type',
    'amount',
    'date',
    'tag',
    'referenceNumber'
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.getCreditAccounts(this.currentUser.id);
    this.dataSource.paginator = this.paginator;
  }

  getCreditAccounts(custID: number) {
    this.accountsService.getCreditAccountsDetails(custID).subscribe(
      (data: CreditAccounts[]) => {
        console.log(data);
        this.creditAccounts = data;
        console.log(this.creditAccounts[1].accountId);
        this.getTransactions(this.creditAccounts[0].accountId);
      },
      error => {
        this.alertService.error('Could not retrieve the data requested');
      }
    );
  }

  getTransactions(acctID: number) {
    this.accountsService.getTransactionsDetails(acctID).subscribe(
      (data: Transactions[]) => {
        console.log(data);
        this.transactionsDetails = data;
        this.dataSource.data = this.transactionsDetails;
        this.isLoading = false;
      },
      error => {
        this.alertService.error(
          'There are no transactions for this credit account'
        );
        this.isLoading = false;
      }
    );
  }
}
