
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required , get_jwt
from app.services.evolution_service import EvolutionService
from app.models import Instance
from app.extensions import db
from app.utils.decorators import superuser_required 

instance_bp = Blueprint("instances", __name__, url_prefix="/instances")

@instance_bp.route("/instancesdb", methods=["GET"])
@jwt_required()
def get_instances_db():
    claims = get_jwt()

    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 5))

    # 2. Calcular offset y limit
    offset = (page - 1) * per_page
    limit = per_page

    if claims.get("is_superuser"):
        instances = Instance.query.offset(offset).limit(limit).all()
        instances_dict = [instance.to_dict() for instance in instances]
        total_items = db.session.query(Instance).count()
        total_pages = (total_items + per_page - 1) // per_page  #
        return jsonify({
            "instances": instances_dict,
            'pagination': {
                'total_items': total_items,
                'total_pages': total_pages,
                'current_page': page,
                'per_page': per_page
            }
        })
    company = claims.get("id_company")
    instances = Instance.query.filter_by(company_id=company).all()
    instances_dict = [instance.to_dict() for instance in instances]
    return jsonify(instances_dict)

@instance_bp.route("/", methods=["POST"])
@jwt_required()
@superuser_required
def create_instance():
    data = request.json
    EvolutionService.create_instance(data["name"], data["webhook_url"], data.get("number"))

    instance = Instance(
        name=data["name"],
        evolution_name=data["evolution_name"],
        company_id=data["company_id"]
    )
    db.session.add(instance)
    db.session.commit()

    return jsonify({"msg": "Instancia creada"})

@instance_bp.route("/qr/<name>", methods=["GET", "OPTIONS"])
@jwt_required()
def get_qr(name):
    response = EvolutionService.get_qr(name)
    return jsonify(response.json())

@instance_bp.route("/logout/<name>", methods=["DELETE"])
@jwt_required()
def logout_instance(name):
    response = EvolutionService.logout_instance(name)
    return jsonify(response.json())

@instance_bp.route("/", methods=["GET"])
@jwt_required()
def fetch_instances():
    # obtengo todas las intancias de evolution y luego las filtro por empresa de mi base de datos
    response = EvolutionService.fetch_instances()
    claims = get_jwt()
    company = claims.get("id_company")
    new_instances = []
    for instance  in response.json():
        db_instance = Instance.query.filter_by(company_id=company, evolution_name=instance["name"]).all()
        if db_instance:
            new_instances.append(instance)
    
    return jsonify(new_instances)

@instance_bp.route("/<name>/<id>", methods=["DELETE"])
@jwt_required()
def delete_instance(name, id):
    response = EvolutionService.delete_instance(name)
    if response.status_code == 200:
        instance = Instance.query.get(id)
        db.session.delete(instance)
        db.session.commit()
    return jsonify(response.json())