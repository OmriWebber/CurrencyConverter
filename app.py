from flask import render_template, Flask, request, redirect, url_for
from flask_login import LoginManager, login_required, current_user
from flask_migrate import Migrate
from sqlalchemy import delete
from models import Users, Conversions, db

# Create app and set config for database
app = Flask(__name__)

application = app

app.config['SECRET_KEY'] = 'dev'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Migrate new database to update old database
migrate = Migrate(app, db)

# Init App and Db
db.init_app(app)
migrate.init_app(app, db)

# Init Login Manager
login_manager = LoginManager()
login_manager.login_view = 'auth.login'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))

# blueprint for auth routes in our app
from auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint)

from crypto import crypto as crypto_blueprint
app.register_blueprint(crypto_blueprint)


# Routes
@app.route("/")
def index():
    return render_template('index.html', name='Currency Converter', user=current_user)

# Save Conversion POST route - Login Required
@app.route("/", methods=["POST"])
@login_required
def save_conversion():
    if request.method == "POST":
        fromValue = request.form.get("input-amount-1")
        fromCurrency = request.form.get("currency-input-1")
        toValue = request.form.get("input-amount-2")
        toCurrency = request.form.get("currency-input-2")
        if fromValue and toValue:
            new_conversion = Conversions(user_id=current_user.id, username=current_user.username, fromCurrency=fromCurrency, toCurrency=toCurrency, fromValue=fromValue, toValue=toValue, rate=float(toValue) / float(fromValue))
            db.session.add(new_conversion)
            db.session.commit()
            msg="Conversion Saved"
        else:
            msg = "Please Enter a Value"
    return render_template('index.html', name='Currency Converter', msg=msg, user=current_user)

# History Route
@app.route("/history")
def history():
    return render_template('graph.html', name='Currency Converter - History', user=current_user)

# Recent News Route
@app.route("/recent-news")
def recent_news():
    return render_template('recent_news.html', name='Currency Converter - Recent News', user=current_user)

# Profile Route - Login Required
@app.route("/profile")
@login_required
def profile():
    saved_conversions = Conversions.query.filter_by(user_id = current_user.id).all()
    if current_user.is_Admin:
        users = Users.query.filter(Users.id != current_user.id).all()
    else:
        users = []
    return render_template('profile.html', name='Currency Converter', user=current_user, user_list=users, conversions=saved_conversions)


# Route to delete conversion from profile - Login Required
@app.route("/delete_conversion/<id>")
@login_required
def delete_conversion(id):
    stmt = Conversions.query.filter_by(id = id).one()
    db.session.delete(stmt)
    db.session.commit()
    return redirect(url_for('profile'))

# Route to delete user - Login Required
@app.route("/delete_user/<id>")
@login_required
def delete_user(id):
    stmt = Users.query.filter_by(id = id).one()
    db.session.delete(stmt)
    db.session.commit()
    return redirect(url_for('profile'))

# Route to make user an admin - Login Required
@app.route("/make_admin/<id>")
@login_required
def make_admin(id):
    stmt = Users.query.filter_by(id = id).one()
    stmt.is_Admin = True
    db.session.commit()
    return redirect(url_for('profile'))

# Route to remove admin from user - Login Required
@app.route("/remove_admin/<id>")
@login_required
def remove_admin(id):
    stmt = Users.query.filter_by(id = id).one()
    stmt.is_Admin = False
    db.session.commit()
    return redirect(url_for('profile'))


if __name__ == "__main__":
    app.run()
    
