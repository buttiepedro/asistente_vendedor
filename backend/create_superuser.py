import os
from app import create_app
from app import db
from app.models import User
from app.models import Company
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager

jwt = JWTManager()

load_dotenv()

def create_superuser():
    app = create_app()
    
    with app.app_context():

        # Crear superusuario si no existe
        user = User.query.filter_by(email="superuser@admin.com").first()
        if not user:
            user = User(
                email="superuser@admin.com",
                is_superuser=True,
                company_id=1
            )
            user.set_password("123")
            db.session.add(user)
            db.session.commit()
            print("✔ Superusuario creado")
        else:
            print("ℹ Superusuario ya existe")

if __name__ == "__main__":
    create_superuser()
