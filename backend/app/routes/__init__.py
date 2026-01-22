
from .instance_routes import bp as instance_bp
from .company import bp as company_bp
from .user import bp as usuarios_bp
from .login import bp as auth_bp

def register_routes(app):
    app.register_blueprint(instance_bp)
    app.register_blueprint(company_bp)
    app.register_blueprint(usuarios_bp)
    app.register_blueprint(auth_bp)
