import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {
  AlertService,
  AccountsService,
  AuthenticationService
} from '../_services';
import { Transactions, User, DepositAccounts } from '../_models';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  providers: [AccountsService]
})
export class AccountsComponent implements OnInit {
  panelOpenState = true;
  loading = false; // loading for data submission
  isLoading = true; // loading upon retrieving data for table
  currentUser: User;
  transactionsDetails: Transactions[];
  depositAccounts: DepositAccounts;
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

  ngOnInit(): void {
    this.getDepositAccounts(this.currentUser.id);
    this.dataSource.paginator = this.paginator;
  }

  getDepositAccounts(custID: number) {
    this.accountsService.getDepositAccountsDetails(custID).subscribe(
      (data: DepositAccounts) => {
        console.log(data);
        this.depositAccounts = data;
        console.log(this.depositAccounts[0].accountId);
        this.getTransactions(this.depositAccounts[0].accountId);
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
        this.alertService.error('Could not retrieve the data requested');
      }
    );
  }
}
