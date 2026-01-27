from math import ceil
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.models import User
from app.extensions import db
from app.utils.decorators import superuser_required

bp = Blueprint("users", __name__, url_prefix="/users")

# Esta línea protege TODAS las rutas que pertenezcan a este blueprint
@bp.before_request
@jwt_required()
def check_jwt():
  pass

@bp.get("/")
@superuser_required
def get_users():
  # 1. Recibir parámetros
  page = int(request.args.get('page', 1))
  per_page = int(request.args.get('per_page', 5))

  # 2. Calcular offset y limit
  offset = (page - 1) * per_page
  limit = per_page

  # 3. Consultar usuarios con paginación
  users_query = User.query.offset(offset).limit(limit)
  users = users_query.all()
  
  total_items = db.session.query(User).count()
  total_pages = ceil(total_items / per_page)

  return jsonify({
    "users":[u.to_dict() for u in users],
    'pagination': {
      'total_items': total_items,
      'total_pages': total_pages,
      'current_page': page,
      'per_page': per_page
    }})

@bp.post("/")
@superuser_required
def create_user():
  data = request.json
  new_user = User(
    email=data["email"],  # Asegúrate de hashear la contraseña en el modelo
    is_superuser=data.get("is_superuser", False),
    company_id=data.get("company_id")
  )

  new_user.set_password(data["password"])

  if new_user.email in [user.email for user in User.query.filter_by(email=new_user.email).all()]:
    return jsonify({"error": "El email ya existe","state": True}), 400

  db.session.add(new_user)
  db.session.commit()
  return jsonify({"msg": "Usuario creado"})

@bp.delete("/<int:user_id>")
@superuser_required 
def delete_user(user_id):
  user = User.query.get_or_404(user_id)
  db.session.delete(user)
  db.session.commit()
  return jsonify({"msg": "Usuario eliminado"})
