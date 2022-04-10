import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash
import MySQLdb.cursors
from app import db

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=('GET', 'POST'))
def register():
    msg = ''
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        hash = generate_password_hash(password)
        error = None
        cursor = db.connection.cursor()
        
        cursor.execute('SELECT * FROM users WHERE username = %s',(username,))
        if cursor.fetchone():
            print("Found Duplicate")
            error = "Username already exists!"
        
        print(error)
        
        if error is None:
            cursor.execute('INSERT INTO users VALUES(id,%s,%s)',(username,hash,))
            db.connection.commit()
            cursor.close()
            return redirect(url_for("auth.login")) 
        else:
            msg = error
            print(msg)
            cursor.close()
    return render_template('auth/register.html',  msg=msg, name='Currency Converter - Register')


@bp.route('/login', methods=('GET', 'POST'))
def login():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
        
        cursor.execute('SELECT * FROM users WHERE username = %s',(username,))
        
        user = cursor.fetchone()
        if user is None:
            msg = 'Incorrect username.'
        elif not check_password_hash(user['password'], password):
            msg = 'Incorrect password.'
        elif user:
            # Create session data, we can access this data in other routes
            session['loggedin'] = True
            session['id'] = user['id']
            session['username'] = user['username']
            # Redirect to home page
            return redirect(url_for('index'))
        else:
            # Account doesnt exist or username/password incorrect
            msg = 'Incorrect username/password!'
        
        
            
        print(msg)
        db.connection.commit()
        cursor.close()

    return render_template('auth/login.html', msg=msg, name='Currency Converter - Login')


@bp.before_app_request
def load_logged_in_user():
    
    user_id = session.get('id')
    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)

    if user_id is None:
        g.user = None
    else:
        cursor.execute( 'SELECT * FROM users WHERE id = %(user_id)s', {'user_id' : user_id} )
        
        g.user = cursor.fetchone()
        
    db.connection.commit()
    cursor.close()
        

@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view