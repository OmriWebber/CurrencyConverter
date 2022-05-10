from flask import render_template, Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_required, current_user
from flask_migrate import Migrate
from models import Users, Conversions, db



def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'dev'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    
    migrate = Migrate(app, db)

    db.init_app(app)
    migrate.init_app(app, db)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return Users.query.get(int(user_id))

    # blueprint for auth routes in our app
    from auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)


    @app.route("/")
    def index():
        return render_template('index.html', name='Currency Converter', user=current_user)


    @app.route("/history")
    def history():
        return render_template('graph.html', name='Currency Converter - History', user=current_user)


    @app.route("/recent-news")
    def recent_news():
        return render_template('recent_news.html', name='Currency Converter - Recent News', user=current_user)


    @app.route("/profile")
    @login_required
    def profile():
        saved_conversions = Conversions.query.filter_by(user_id = current_user.id).all()
        print(saved_conversions)
        return render_template('profile.html', name='Currency Converter', user=current_user, conversions=saved_conversions)


    @app.route("/save_conversion", methods=["POST"])
    @login_required
    def save_conversion():
        if request.method == "POST":
            tfromValue = request.form.get("input-amount-1")
            tfromCurrency = request.form.get("currency-input-1")
            ttoValue = request.form.get("input-amount-2")
            ttoCurrency = request.form.get("currency-input-2")
            new_conversion = Conversions(user_id=current_user.id, username=current_user.username, fromCurrency=tfromCurrency, toCurrency=ttoCurrency, fromValue=tfromValue, toValue=ttoValue, rate=float(ttoValue) / float(tfromValue))
            db.session.add(new_conversion)
            db.session.commit()
        return render_template('index.html', name='Currency Converter', msg="Conversion Saved", user=current_user)
    
    return app