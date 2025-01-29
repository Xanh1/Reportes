import uuid
from datetime import datetime

from app import DB

class User(DB.Model):

    # table name
    __tablename__ = 'users'

    # fields
    id        = DB.Column(DB.Integer, primary_key = True)
    uid       = DB.Column(DB.String(60), default = str(uuid.uuid4()), nullable = False)
    dni       = DB.Column(DB.String(10), nullable = False, unique = True)
    name      = DB.Column(DB.String(50), nullable = False)
    last_name = DB.Column(DB.String(50), nullable = False)
    email     = DB.Column(DB.String(250), nullable = False, unique = True)
    password  = DB.Column(DB.String(162), nullable = False)
    status    = DB.Column(DB.Boolean, nullable = False, default=True)
    
    # audit fields
    created_at = DB.Column(DB.DateTime, default = datetime.now)
    updated_at = DB.Column(DB.DateTime, default = datetime.now, onupdate = datetime.now)
    
    # methods
    @property
    def serialize(self):
        return {
            'uid'        : self.uid,
            'dni'        : self.dni,
            'name'       : self.name,
            'created_at' : self.created_at,
            'last_name'  : self.last_name,
            'email'      : self.email,
            'status'     : self.status,
        }
    
    def copy(self):
        copy_user = User(
            id         = self.id,
            uid        = self.uid,
            name       = self.name,
            dni        = self.dni,
            last_name  = self.last_name,
            created_at = self.created_at,
            email      = self.email,
            password   = self.password,
            status     = self.status,
        )
    
        return copy_user