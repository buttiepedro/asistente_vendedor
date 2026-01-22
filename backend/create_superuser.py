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
        # Crear empresa si no existe
        company = Company.query.filter_by(name='Administradores').first()
        if not company:
            company = Company(
                name='Administradores'
            )
            db.session.add(company)
            db.session.commit()
            print("✔ Empresa Administradores creada")

        # Crear superusuario si no existe
        user = User.query.filter_by(email='superuser@admin.com').first()
        if not user:
            user = User(
                email='superuser@admin.com',
                is_superuser=True,
                company_id=company.id
            )
            user.set_password('123')
            db.session.add(user)
            db.session.commit()
            print("✔ Superusuario creado")
        else:
            print("ℹ Superusuario ya existe")

if __name__ == "__main__":
    create_superuser()
