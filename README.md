# CurrencyConverter

###### Notes
Admin Account:\n
username: admin
password: admin
Note: Admin account does not appear in User List so it is uneditable.

Test User Account:
username: user
password: user

###### Prerequisites
Python 3.10


###### Intructions

Create Virtual Environment
```
python -m venv venv
```

Click Yes

![Set VS Workspace](https://i.imgur.com/ocNHGzl.png)


Activate Virtual Environment
```
venv\Scripts\activate
```

If you get an error relating to 'Scripts not allowed on this system', run this command
```
Set-ExecutionPolicy -ExecutionPolicy AllSigned -Scope LocalMachine
```

Install Dependencies
```
pip install Flask
pip install Flask-Login
pip install Flask-Migrate
pip install Flask-SQLAlchemy
```

Initialise Database
```
flask db init
```

Set Development Environment for debugging and run
```
$env:FLASK_ENV = "development"
flask run
```