from models.notification import Notification

from app import DB

class NotificationController:

    def create(self, data):

        notification = Notification()
        
        notification.description = data['description']
        notification.user_id = data['user']

        DB.session.add(notification)
        DB.session.commit()

        return 'Ok', 'Notificación satisfactoria', 201
    
    def get_notifications_by_user(self, user):

        notifications = Notification.query.filter_by(user_id=user).all()
        
        return 'Ok', 200, notifications
    
