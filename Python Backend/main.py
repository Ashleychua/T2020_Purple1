from flask import Flask
from flask import Flask, render_template, request
import requests
import json
import java.text.SimpleDateFormat;
import java.util.Date;

app = Flask(__name__)

#@app.route('/', methods = ['GET'])
#def home():
#    if request.method == 'GET':
#        print('test')
#        overview = request.args.get('overview')
#        list_deposit = request.args.get('depositList')
#    userName = overview # Get from Frontend
#    response = requests.get("http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/customers/" + str(userName), headers={"identity":"Group25", "token":"97d94689-6bd9-4c8c-a18f-627037c9cf5b"})
#    print(response.json())
#    
#    return render_template('home.html')

url = "http://techtrek-api-gateway.ap-southeast-1.elasticbeanstalk.com/"
#/customers/3/details

@app.route('/login', methods = ['GET'])
def login():
    if request.method == 'GET':
        userName = request.args.get('userName')
        if(userName):
            #Get customer general info
            newUrl = url + "customers/" + str(userName)
            response = requests.get(newUrl, headers = {"identity":"Group25", "token":"97d94689-6bd9-4c8c-a18f-627037c9cf5b"})

            #Converting json to dictionary
            info_dict = response.json()
            custId = info_dict['customerId']
            
            #Get customer details
            newUrl = url + "customers/" + custId + "/details"
            response = requests.get(newUrl, headers = {"identity":"Group25", "token":"97d94689-6bd9-4c8c-a18f-627037c9cf5b"})
            
            #Convert json to dictionary
            details_dict = response.json()
    return render_template('home.html')


@app.route('/deposit', methods = ['GET'])
def deposit():
    if request.method == 'GET':
        custId = request.args.get('customerId')
        if(customerId):
            newUrl = url + "accounts/deposit/" + str(custId)
            
#            #Get List of Deposit Accounts
#            list_dep = requests.get(newUrl, headers = {"identity":"Group25", "token":"97d94689-6bd9-4c8c-a18f-627037c9cf5b"})
#
#            #Get balance of accounts
#            newUrl = url + "/accounts/deposit/%s/balance" % accId
#            bal_acc = requests.get(newUrl, headers = {"identity":"Group25", "token":"97d94689-6bd9-4c8c-a18f-627037c9cf5b"})
#                
#            #Get transaction details for specific account
#            newUrl = url + "transactions/%s?from=01-01-2018&to=02-01-2019" % str(accId)
#            transaction = requests.get(newUrl, headers = {"identity":"Group25", "token":"97d94689-6bd9-4c8c-a18f-627037c9cf5b"})
            
            #Combining in one json
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
            response = json.dumps(accounts) #json for 3,4,5
    return render_template('home.html')


def credit():
    if request.method == 'GET':
        customerId = request.args.get('customerId')
        if(customerId):
            newUrl = url + "/accounts/credit/%s" + str(customerId)
            
@app.route('/mon_expense', methods = ['GET'])
def monthlyExpense():
    if request.method == 'GET':
        accId = request.args.get('accId')
        newUrl = url + "transactions/%s?from=01-01-2018&to=02-01-2019" + accId
        response = requests.get(newUrl, headers = {"identity":"Group25", "token":"97d94689-6bd9-4c8c-a18f-627037c9cf5b"})

        #Converting json to dictionary
        trans_dict = response.json()
        
        total = 0
        i = 1
        mon_list = []
        foreach e in trans_dict:
            e[]
            for i in range 13:
                if e["type"] == "DEBIT":
                
        



if __name__ == '__main__':
    #app.run(debug=True)
    
    app.run(port=5002)
    