import json
import requests

class Customer:
    def __init__(self):
        self.customerId = customerId
        self.userName = userName
        self.gender = gender
        self.firstName = firstName
        self.lastName = lastName
        self.lastLogin = lastLogin
        self.dateOfBirth = dateOfBirth
        
        def overview():
            d_dict = {"firstName":firstName, "lastName":lastName, "lastLogin":lastLogin}
            app_json = json.dumps(d_dict)
            return app_json
    
class Transaction:
    def __init__(self, transactionId, accountId, type, amount, date, tag, referenceNumber):
        self.transactionId = transactionId
        self.accountId = accountId
        self.type = type
        self.amount = amount
        self.date = date
        self.tag = tag
        self.referenceNumber = referenceNumber


class depositAccount:
    def __init__(self, accountId, type, displayName, accountNumber):
        self.accountId = accountId
        self.type = type
        self.displayName = displayName
        self.accountNumber = accountNumber
        
        
class creditAccount:
    def __init__(self, accountId, displayName, cardNumber):
        self.accountId = accountId
        self.displayName = displayName
        self.cardNumber = cardNumber
        
class marketingMsg:
    def __init__(self, messageId, dateCreated, summary, type):
        self.messageId = messageId
        self.dateCreated = dateCreated
        self.summary = summary
        self.type = type
        
class personalMsg:
    def __init__(self, messageId, dateCreated, topic, subject, body, isRead):
        self.messageId = messageId
        self.dateCreated = dateCreated
        self.topic = topic
        self.subject = subject
        self.body = body
        self.isRead = isRead
    