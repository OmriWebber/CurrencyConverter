from flask import Flask
from flask import render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html', name='Currency Converter')


@app.route("/history")
def history():
    return render_template('graph.html', name='Currency Converter - History')


@app.route("/recent-news")
def recent_news():
    return render_template('recent_news.html', name='Currency Converter - Recent News')






