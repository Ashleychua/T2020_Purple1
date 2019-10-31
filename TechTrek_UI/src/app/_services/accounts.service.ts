import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  sampleUrl =
    'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/marytan';
  url = 'http://localhost:4201/transactions';

  // get deposit accounts details by cust id
  depositAccountsUrl =
    'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/deposit/';

  // get credit accounts details by cust id
  creditAccountsUrl =
    'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/credit/';

  // get transaction details by acct id
  transactionDetailsUrl =
    'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/transactions/';

  // get personal messages
  personalMessagesUrl =
    'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/message/';

  details =
    'http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/';

  headerDict = {
    identity: 'Group25',
    token: '97d94689-6bd9-4c8c-a18f-627037c9cf5b'
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  };

  constructor(private http: HttpClient) {}

  getDepositAccountsDetails(custID: number) {
    return this.http.get(this.depositAccountsUrl + custID, this.requestOptions);
  }

  getCreditAccountsDetails(custID: number) {
    return this.http.get(this.creditAccountsUrl + custID, this.requestOptions);
  }

  getTransactionsDetails(acctID: number) {
    console.log('this is in service acct id get tx: ' + acctID);
    return this.http.get(
      this.transactionDetailsUrl + acctID + '?from=01-01-2018&to=02-01-2019',
      this.requestOptions
    );
  }

  getPersonalMessages(custID: number) {
    return this.http.get(
      this.personalMessagesUrl + custID,
      this.requestOptions
    );
  }

  getCustDetails(custID: number) {
    return this.http.get(
      this.details + custID + '/details',
      this.requestOptions
    );
  }
}
