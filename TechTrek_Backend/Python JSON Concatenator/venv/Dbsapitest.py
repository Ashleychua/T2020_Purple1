import requests
import json
url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/"

custDetails=requests.get(url +'customers/2/details', headers={"identity": "Group25", "token":"97d94689-6bd9-4c8c-a18f-627037c9cf5b"})
dict1 = json.loads(custDetails.text)
custId = dict1.get('customerId')
accDetails = requests.get(url + 'accounts/deposit/' + custId, headers={"identity": "Group25", "token":"97d94689-6bd9-4c8c-a18f-627037c9cf5b"})
dict2 = json.loads(accDetails.text)
dict1.update(dict2[0])

initialLogin = json.dumps(dict1) #JSON for the Initial login

accDetails1 = requests.get(url + 'accounts/deposit/' + custId, headers={"identity": "Group25", "token":"97d94689-6bd9-4c8c-a18f-627037c9cf5b"})
dict10 = json.loads(accDetails.text)
accounts = dict10[0]
accId = dict2[0].get('accountId')
balDetails = requests.get(url + 'accounts/deposit/'+ str(accId)+'/balance?month=1&year=2018', headers={"identity": "Group25", "token":"97d94689-6bd9-4c8c-a18f-627037c9cf5b"})
dict3 = json.loads(balDetails.text)
accounts.update(dict3)
transactionsDetails = requests.get(url + 'transactions/'+ str(accId)+'?from=01-01-2018&to=02-01-2019', headers={"identity": "Group25", "token":"97d94689-6bd9-4c8c-a18f-627037c9cf5b"})
dict5 = json.loads(transactionsDetails.text)
#print(dict5)
transactions = {}
transactions["transactions"] = dict5
accounts.update(transactions)
transactionDetailsWithBal = json.dumps(accounts) #json for 3,4,5

creditList = requests.get('http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/accounts/credit/'+custId, headers={"identity": "Group25", "token":"97d94689-6bd9-4c8c-a18f-627037c9cf5b"})
dict4 = json.loads(creditList.text)
Creditaccounts ={}
Creditaccounts["CreditAccount1"] = dict4[0].get('accountId')
Creditaccounts["CreditName1"] = dict4[0].get('displayName')
Creditaccounts["CreditCardNumber1"] = dict4[0].get('cardNumber')
Creditaccounts["CreditAccount2"] = dict4[1].get('accountId')
Creditaccounts["CreditName2"] = dict4[1].get('displayName')
Creditaccounts["CreditCardNumber2"] = dict4[1].get('cardNumber')
