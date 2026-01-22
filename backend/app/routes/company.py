from math import ceil
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.extensions import db
from app.utils.decorators import superuser_required
from app.models import Company

bp = Blueprint("companies", __name__, url_prefix="/companies")

# Esta línea protege TODAS las rutas que pertenezcan a este blueprint
@bp.before_request
@jwt_required()
def check_jwt():
  pass

@bp.get("/")
@superuser_required
def get_companies():
  companies = Company.query.all()
  companies_data = [company.to_dict() for company in companies]
  return jsonify(companies_data)

@bp.get("/pagination")
@superuser_required
def get_companies_paginated():
  # 1. Recibir parámetros
  page = int(request.args.get('page', 1))
  per_page = int(request.args.get('per_page', 5))

  # 2. Calcular offset y limit
  offset = (page - 1) * per_page
  limit = per_page

  # 3. Consultar empresas con paginación
  companies_query = Company.query.offset(offset).limit(limit)
  companies = companies_query.all()
  
  total_items = db.session.query(Company).count()
  total_pages = ceil(total_items / per_page)

  return jsonify({
    "companies":[c.to_dict() for c in companies],
    'pagination': {
      'total_items': total_items,
      'total_pages': total_pages,
      'current_page': page,
      'per_page': per_page
    }})

@bp.post("/")
@superuser_required
def create_company():
  data = request.json
  new_company = Company(name=data["name"])
  db.session.add(new_company)
  db.session.commit()

  return jsonify({"msg": "Empresa creada"})

@bp.delete("/<int:company_id>")
@superuser_required
def delete_company(company_id):
  company = Company.query.get_or_404(company_id)
  db.session.delete(company)
  db.session.commit()
  return jsonify({"msg": "Empresa eliminada"})
