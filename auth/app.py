from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pymysql
pymysql.install_as_MySQLdb()
import init_table

DB = SQLAlchemy()

def create_app():
    app = Flask(__name__, instance_relative_config = False)

    CORS(app)
    
    app.config.from_object('config.config.Config')
    
    DB.init_app(app)
    
    with app.app_context():
        from routes.user_route import user_url
        
        app.register_blueprint(user_url)

        init_table.init()
        
        DB.create_all()
    
    return app