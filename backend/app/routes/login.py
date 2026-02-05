from flask import Blueprint, request
from app.utils.decorators import superuser_required
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from datetime import timedelta
from app.extensions import db

from app.models import User

bp = Blueprint("auth", __name__, url_prefix="/auth")

@bp.post("/login")
def login():
    data = request.get_json()

    # Validación básica
    if not data or "email" not in data or "password" not in data:
        return {"msg": "Contraseña o email no proporcionados"}, 400

    # Buscar usuario
    user = User.query.filter_by(email=data["email"]).first()

    # Validar credenciales
    if not user or not user.check_password(data["password"]):
        return {"msg": "Contraseña o email incorrectos"}, 401

    # Crear JWT
    token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "id_company": user.company_id,
            "is_superuser": user.is_superuser
        },
        expires_delta=timedelta(hours=8)
    )

    return {
        "access_token": token
    }, 200



@bp.post("/reset-password")
@jwt_required() # Requiere token válido
@superuser_required # Requiere que el claim "is_superuser" sea True
def admin_reset_password():
    # 1. Obtener los claims (la info extra que pusiste en el login)
    claims = get_jwt()
    
    # 2. Verificar si es superusuario
    if not claims.get("is_superuser"):
        return {"msg": "Acceso denegado. Se requieren permisos de superusuario"}, 403

    data = request.get_json()
    user_id_to_change = data.get("user_id")
    new_password = data.get("new_password")

    if not user_id_to_change or not new_password:
        return {"msg": "Faltan datos (user_id o new_password)"}, 400

    # 3. Buscar al usuario que queremos modificar
    user = User.query.get(user_id_to_change)
    if not user:
        return {"msg": "Usuario no encontrado"}, 404

    # 4. Cambiar contraseña (usando el método de tu modelo)
    user.set_password(new_password) 
    db.session.commit()

    return {"msg": f"Contraseña de {user.email} actualizada por el administrador"}, 200