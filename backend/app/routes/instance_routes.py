
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.services.evolution_service import EvolutionService
from app.models import Instance
from app.extensions import db
from app.utils.decorators import superuser_required

bp = Blueprint("instances", __name__, url_prefix="/instances")

@bp.route("/", methods=["POST"])
@jwt_required()
@superuser_required
def create_instance():
    data = request.json
    EvolutionService.create_instance(data["name"])

    instance = Instance(
        name=data["name"],
        evolution_name=data["name"],
        company_id=data["company_id"]
    )
    db.session.add(instance)
    db.session.commit()

    return jsonify({"msg": "Instancia creada"})
