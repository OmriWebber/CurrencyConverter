import os

from flask import Flask,render_template, request, g
from flask_mysqldb import MySQL


app = Flask(__name__)
app.config.from_mapping(
        SECRET_KEY='dev'
    )

app.config['MYSQL_HOST'] = '66.198.240.39'
app.config['MYSQL_USER'] = 'webberwe_admin'
app.config['MYSQL_PASSWORD'] = 'flaskapp123'
app.config['MYSQL_DB'] = 'webberwe_currencyconverter'

db = MySQL(app)

import auth
app.register_blueprint(auth.bp)


@app.route("/")
def index():
    return render_template('index.html', name='Currency Converter')


@app.route("/history")
def history():
    return render_template('graph.html', name='Currency Converter - History')


@app.route("/recent-news")
def recent_news():
    return render_template('recent_news.html', name='Currency Converter - Recent News')


@app.route("/profile")
def profile():
    return render_template('profile.html', name='Currency Converter')