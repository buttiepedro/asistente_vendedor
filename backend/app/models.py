from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash

class Company(db.Model):
  __tablename__ = "company"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(120), nullable=False)
  web_hook_url = db.Column(db.String(255))
  looker_url = db.Column(db.String(255))
  active = db.Column(db.Boolean, default=True)

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "active": self.active,
      "web_hook_url": self.web_hook_url,
      "looker_url": self.looker_url,
    }

class Instance(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(120))##nombre interno de la instancia, ej: "Instancia 1"
  evolution_name = db.Column(db.String(120))## nombre de la instancia en evolution, ej: "Empresa 1"
  name_vendor = db.Column(db.String(120))
  position_vendor = db.Column(db.String(120))
  company_id = db.Column(db.Integer, db.ForeignKey("company.id"))

  company = db.relationship("Company")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "evolution_name": self.evolution_name,
      "name_vendor": self.name_vendor,
      "position_vendor": self.position_vendor,
      "company": self.company.to_dict() if self.company else None,
    }

class PhoneLine(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  phone_number = db.Column(db.String(30))
  instance_id = db.Column(db.Integer, db.ForeignKey("instance.id"))
  company_id = db.Column(db.Integer, db.ForeignKey("company.id"))

  instance = db.relationship("Instance")
  company = db.relationship("Company")

  def to_dict(self):
    return {
      "id": self.id,
      "phone_number": self.phone_number,
      "instance": self.instance.to_dict() if self.instance else None,
      "company": self.company.to_dict() if self.company else None,
    }

class User(db.Model):
  __tablename__ = "user"
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(120), unique=True, nullable=False)
  password_hash = db.Column(db.String(255), nullable=False)
  is_superuser = db.Column(db.Boolean, default=False)
  company_id = db.Column(db.Integer, db.ForeignKey("company.id"))

  company = db.relationship("Company")

  def set_password(self, password: str):
    self.password_hash = generate_password_hash(password)

  def check_password(self, password: str) -> bool:
    return check_password_hash(self.password_hash, password)

  def to_dict(self):
    return {
      "id": self.id,
      "email": self.email,
      "company": self.company.name if self.company else None,
      "is_superuser": self.is_superuser,
    }