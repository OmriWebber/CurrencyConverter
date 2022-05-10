# CurrencyConverter

###### Intructions

Create Virtual Environment
```
python -m venv venv
```

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

![This is an image](https://imgur.com/a/U9EJeqt)

Set Development Environment for debugging and run
```
$env:FLASK_ENV = "development"
flask run
```