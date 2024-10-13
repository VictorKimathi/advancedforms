Here’s a summarized representation of the commands and their outputs:

---

### User Registration
**Command:**
```bash
curl -X POST http://127.0.0.1:8000/api/register/ \
-H "Content-Type: application/json" \
-d '{
  "username": "victor123",
  "email": "victor.codes9532@gmail.com",
  "password": "securePassword123",
  "profile": {
    "phone_number": "0712345678",
    "gender": "male",
    "occupation": "software_dev",
    "date_of_birth": "1995-05-15"
  }
}'
```
**Output:**
```json
{
  "message": "User registered successfully."
}
```

---

### User Login
**Command:**
```bash
curl -X POST http://127.0.0.1:8000/api/login/ \
-H "Content-Type: application/json" \
-d '{
  "username": "victor123",
  "email": "victor.codes9532@gmail.com",
  "password": "securePassword123"
}'
```
**Output:**
```json
{
  "token": "2b813dfedde303e59b23667584b792f2d2767248"
}
```

---

### Create a Debt
**Command:**
```bash
curl -X POST http://localhost:8000/api/debts/ \
-H "Authorization: Token 2b813dfedde303e59b23667584b792f2d2767248" \
-H "Content-Type: application/json" \
-d '{
    "amount": 5000.00,
    "debt_type": "personal_loan"
}'
```
**Output:**
```json
{"id":7,"amount":"5000.00"}
```

---

### Create a Transaction
**Command:**
```bash
curl -X POST http://localhost:8000/api/transactions/ \
-H "Authorization: Token 2b813dfedde303e59b23667584b792f2d2767248" \
-H "Content-Type: application/json" \
-d '{
    "amount": 5000.00,
    "transaction_type": "income",
    "payment_method": "cash",
    "category": "salary"
}'
```
**Output:**
```json
{"id":11,"user":6,"amount":"5000.00","transaction_type":"income","payment_method":"cash","category":"salary"}
```

---

### Get Transaction by ID (Valid)
**Command:**
```bash
curl -X GET http://localhost:8000/api/transactions/11/ \
-H "Authorization: Token 2b813dfedde303e59b23667584b792f2d2767248"
```
**Output:**
```json
{"id":11,"user":6,"amount":"5000.00","transaction_type":"income","payment_method":"cash","category":"salary"}
```

---

### Get Transaction by ID (Invalid)
**Command:**
```bash
curl -X GET http://localhost:8000/api/transactions/0/ \
-H "Authorization: Token 2b813dfedde303e59b23667584b792f2d2767248"
```
**Output:**
```json
{"detail":"No Transaction matches the given query."}
```

---

### List Debt Repayments
**Command:**
```bash
curl -X GET http://localhost:8000/api/debt-repayments/ \
-H "Authorization: Token 2b813dfedde303e59b23667584b792f2d2767248"
```
**Output:**
```json
[]
```

---

### Get Financial Summary
**Command:**
```bash
curl -X GET http://localhost:8000/api/financial-summary/ \
-H "Authorization: Token 2b813dfedde303e59b23667584b792f2d2767248"
```
**Output:**
```json
{"total_income":5000.0,"total_expenses":0,"net_income":5000.0}
```

---

### List Financial Goals
**Command:**
```bash
curl -X GET http://localhost:8000/api/financial-goals/ \
-H "Authorization: Token 2b813dfedde303e59b23667584b792f2d2767248"
```
**Output:**
```json
[]
```

---

### Create a Financial Goal
**Command:**
```bash
curl -X POST http://localhost:8000/api/financial-goals/ \
-H "Authorization: Token 2b813dfedde303e59b23667584b792f2d2767248" \
-H "Content-Type: application/json" \
-d '{
    "goal_name": "Buy a house",
    "target_amount": 50000.00,
    "target_date": "2025-12-31"
}'
```
**Output:**
```json
{"id":1,"goal_name":"Buy a house","target_amount":"50000.00","target_date":"2025-12-31"}
```

---

### Get Specific Financial Goal
**Command:**
```bash
curl -X GET http://localhost:8000/api/financial-goals/1/ \
-H "Authorization: Token 2b813dfedde303e59b23667584b792f2d2767248"
```
**Output:**
```json
{"id":1,"goal_name":"Buy a house","target_amount":"50000.00","target_date":"2025-12-31"}
```

---

This representation summarizes the commands you've executed along with their expected outputs, making it easier to reference.