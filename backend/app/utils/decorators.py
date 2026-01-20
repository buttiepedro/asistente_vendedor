
from flask_jwt_extended import get_jwt_identity
from functools import wraps
from flask import abort

def role_required(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            user = get_jwt_identity()
            if user["role"] not in roles:
                abort(403)
            return fn(*args, **kwargs)
        return decorator
    return wrapper
