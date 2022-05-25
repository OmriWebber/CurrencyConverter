from flask import Blueprint, render_template
from flask_login import current_user

crypto = Blueprint('crypto', __name__, url_prefix='/crypto')

from app import current_user

@crypto.route('/')
def index():
    return render_template('crypto/index.html', name='Crypto Converter', user=current_user)


@crypto.route('/coin=<coin>')
def coin_info(coin):
    return render_template('crypto/crypto.html', name='Crypto Converter', user=current_user, coin=coin)


@crypto.route('/history')
def history():
    
    return render_template('crypto/graph.html', name='Crypto Converter - History', user=current_user)

@crypto.route('/recent-news')
def recent_news():
    return render_template('crypto/recent_news.html', name='Crypto Converter - Recent News', user=current_user)
