from math import ceil
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.extensions import db
from app.utils.decorators import superuser_required
from app.models import Company
from app.models import Instance

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

  # 4. obtener las instancias asociadas a cada empresa
  companies_with_instances = []
  for company in companies:
    instances = Instance.query.filter_by(company_id=company.id).all()
    company_dict = company.to_dict()
    company_dict["instances"] = [instance.to_dict() for instance in instances]
    companies_with_instances.append(company_dict)

  return jsonify({
    "companies": companies_with_instances,
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
  new_company = Company(name=data["name"], web_hook_url=data.get("web_hook_url"))  
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

@bp.patch("/<int:company_id>")
@superuser_required
def update_company(company_id):
  company = Company.query.get_or_404(company_id)
  data = request.json
  company.name = data.get("name", company.name)
  company.web_hook_url = data.get("web_hook_url", company.web_hook_url)
  db.session.commit()

  return jsonify({"msg": "Empresa actualizada"})