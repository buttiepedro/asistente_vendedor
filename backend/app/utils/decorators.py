
from flask_jwt_extended import get_jwt
from flask import jsonify
from functools import wraps

def superuser_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        claims = get_jwt()
        if claims.get("is_superuser"):
            return fn(*args, **kwargs)
        return jsonify({"msg": "Acceso restringido: Solo Superusuarios"}), 403
    return wrapper
