from flask import Blueprint, jsonify, make_response, request
from routes.utils import json_response
from controllers.notification_controller import NotificationController
from routes.schemas.schema import create_notification
from flask_expects_json import expects_json


notification_url = Blueprint('notification_url', __name__)

notification_controller = NotificationController()

@notification_url.route('/notify', methods = ['POST'])
@expects_json(create_notification)
def notify():
    
    json = request.json
    
    msg, context, code = notification_controller.create(data = json)

    return make_response(jsonify({'msg': msg, 'code': code, 'context': context}), 200)

@notification_url.route('/notification/all/<uid>', methods = ['GET'])
def notification_all(uid):
    
    json = request.json
    
    msg, code, context  = notification_controller.get_notifications_by_user(uid)
    
    return make_response(jsonify(json_response(msg, code, context)), code)