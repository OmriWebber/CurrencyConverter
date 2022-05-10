# CurrencyConverter

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