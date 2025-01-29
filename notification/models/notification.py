import uuid
from datetime import datetime

from app import DB

class Notification(DB.Model):
    
    # table name
    __tablename__ = 'notifications'
    
    # fields
    id          = DB.Column(DB.Integer, primary_key=True)
    uid         = DB.Column(DB.String(60), default=str(uuid.uuid4()), nullable=False)
    description = DB.Column(DB.String(255), nullable=False)
    user_id     = DB.Column(DB.Integer, nullable=False)
    
    # audit fields
    created_at = DB.Column(DB.DateTime, default=datetime.now)
    updated_at = DB.Column(DB.DateTime, default=datetime.now, onupdate=datetime.now)
    
    # relationships
    user = DB.relationship('User', backref=DB.backref('notifications', lazy=True))
    
    # methods
    @property
    def serialize(self):
        return {
            'uid': self.uid,
            'description': self.description,
            'user_id': self.user_id,
            'created_at': self.created_at,
        }
