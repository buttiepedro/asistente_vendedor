
from .instance_routes import bp as instance_bp

def register_routes(app):
    app.register_blueprint(instance_bp)
