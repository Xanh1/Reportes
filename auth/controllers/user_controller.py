from models.user import User

from werkzeug.security import generate_password_hash
from flask import current_app

import jwt
from datetime import datetime, timedelta

from app import DB

class UserController:

    def create(self, data):

        dni_exist = User.query.filter_by(dni=data['dni']).first()

        if dni_exist:
            return 'Error', 'Ya existe este DNI registrado', 400

        email_exist = User.query.filter_by(email=data['email']).first()
        
        if email_exist:
            return 'Error', 'Ya existe este email registrado', 400

        user = User()
        user.dni = data['dni']
        user.name = data['name']
        user.last_name = data['last-name']
        user.email = data['email']
        user.password = generate_password_hash(data['password'])

        DB.session.add(user)
        DB.session.commit()

        return 'Ok', 'Registro satisfactorio', 201
    
    def log_in(self, values):

        user = self.get_by_username(values['username'])

        if not user:
            return 'Error', 401, 'Las credenciales no son válidas'
        
        if user.password != values['password']:
            return 'Error', 401, 'Las credenciales no son válidas'
        
        token = jwt.encode(
            {
            'uid' : user.uid,
            'exp' : datetime.utcnow() + timedelta(minutes = 120)
            },
            key = current_app.config['SECRET_KEY'],
            algorithm = 'HS512',
        )

        return 'Ok', 200, {'token': token, 'user': user.uid }
    
