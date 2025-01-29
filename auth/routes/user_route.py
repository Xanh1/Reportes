from flask import Blueprint, jsonify, make_response, request
from routes.utils import json_response
from controllers.user_controller import UserController
from routes.schemas.schema import create_user
from flask_expects_json import expects_json


user_url = Blueprint('user_url', __name__)

user_controller = UserController()

@user_url.route('/auth/sign-up', methods = ['POST'])
@expects_json(create_user)
def sign_up():
    
    json = request.json
    
    msg, context, code = user_controller.create(data = json)

    return make_response(jsonify({'msg': msg, 'code': code, 'context': context}), 200)

@user_url.route('/auth/sign-in', methods = ['POST'])
@expects_json(create_user)
def sign_in():
    
    json = request.json
    
    msg, code, context  = user_controller.create(data = json)
    
    return make_response(jsonify(json_response(msg, code, context)), code)