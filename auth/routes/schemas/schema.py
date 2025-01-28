
create_user = {
    'type' : 'object',
    'propierties' : {
        'name': {'type' : 'string'},
        'dni': {'type' : 'string'},
        'last-name': {'type' : 'string'},
        'email': {'type' : 'string'},
        'password': {'type' : 'string'}
    },
    'required' : ['name','dni', 'last-name','email', 'password']
}

login_user = {
    'type' : 'object',
    'propierties' : {
        'email': {'type' : 'string'},
        'password': {'type' : 'string'}
    },
    'required' : ['email', 'password']
}