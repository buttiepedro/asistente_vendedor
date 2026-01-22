from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from datetime import timedelta

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
            "is_superuser": user.is_superuser,
        },
        expires_delta=timedelta(hours=8)
    )

    return {
        "access_token": token
    }, 200