
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
    
    offset = (page - 1) * per_page
    limit = per_page
    
    if claims.get("is_superuser"):
        # 1. Agregamos order_by antes de offset y limit
        instances = Instance.query.order_by(Instance.id.asc()).offset(offset).limit(limit).all()
        
        instances_dict = [instance.to_dict() for instance in instances]
        total_items = db.session.query(Instance).count()
        total_pages = (total_items + per_page - 1) // per_page
        
        return jsonify({
            "instances": instances_dict,
            "pagination": {
                "total_items": total_items,
                "total_pages": total_pages,
                "current_page": page,
                "per_page": per_page
            }
        })
    
    company = claims.get("id_company")
    # 2. Agregamos order_by aquí también para usuarios normales
    instances = Instance.query.filter_by(company_id=company).order_by(Instance.id.asc()).all()
    
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
        company_id=data["company_id"],
        name_vendor=data["name_vendor"],
        position_vendor=data["position_vendor"],
    )
    db.session.add(instance)
    db.session.commit()

    return jsonify({"msg": "Instancia creada"})

@instance_bp.route("/<int:instance_id>", methods=["PATCH"])
@jwt_required()
@superuser_required
def update_instance(instance_id):
    data = request.json
    instance = Instance.query.get(instance_id)
    if not instance:
        return jsonify({"msg": "Instancia no encontrada"}), 404
    
    instance.name_vendor = data.get("name_vendor", instance.name_vendor)
    instance.position_vendor = data.get("position_vendor", instance.position_vendor)

    db.session.commit()
    return jsonify({"msg": "Instancia actualizada"})

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
    claims = get_jwt()
    company_id = claims.get("id_company")

    # 1. Obtenemos todas las instancias de la DB ordenadas por ID de una sola vez
    db_instances = Instance.query.filter_by(company_id=company_id).order_by(Instance.id.asc()).all()
    
    # 2. Obtenemos los datos del servicio externo
    response = EvolutionService.fetch_instances()
    if not response.ok:
        return jsonify({"error": "No se pudo conectar con el servicio"}), 500
    
    external_data = response.json()

    # 3. Creamos un diccionario (mapa) para buscar los datos externos rápidamente por nombre
    # Esto evita hacer loops anidados innecesarios
    external_map = {inst["name"]: inst for inst in external_data}

    # 4. Construimos la lista final siguiendo el orden de db_instances (ordenadas por ID)
    new_instances = []
    for db_inst in db_instances:
        # Verificamos si el nombre de la DB existe en la respuesta de Evolution
        if db_inst.evolution_name in external_map:
            new_instances.append(external_map[db_inst.evolution_name])

    return jsonify(new_instances)

@instance_bp.route("/<name>/<id>", methods=["DELETE"])
@jwt_required()
def delete_instance(name, id):
    # response = EvolutionService.delete_instance(name)
    # if response.status_code == 200:
    instance = Instance.query.get(id)
    db.session.delete(instance)
    db.session.commit()
    return jsonify({"msg": "Instancia eliminada"})