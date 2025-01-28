from flask import jsonify, make_response, current_app, request
import jwt
from functools import wraps
from models.user import User
from routes.utils import json_response

def verify_token(token):
    
    try:
        token_info = jwt.decode(token,
                                algorithms='HS512',
                                verify=True,
                                key=current_app.config['SECRET_KEY'])
        
        user = User.query.filter_by(uid=token_info['uid']).first()
        
        if not user:
            return json_response('Error', 401, "El token no es válido")
        
        return None
    
    except Exception:
        
        return json_response('Error', 401, "El token no es válido")


def token_required(f):
    
    @wraps(f)
    def decored(*args, **kwargs):
        
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return make_response(jsonify(json_response('Error', 401, 'No existe el token de autenticación')), 401)
        
        error_response = verify_token(token)
        
        if error_response:
            return make_response(jsonify(error_response), error_response['code'])
        
        return f(*args, **kwargs)
    
    return decored

def auth_token(token):

    error_response = verify_token(token)
    
    if error_response:
        return error_response
    
    return json_response('OK', 200, 'valid')