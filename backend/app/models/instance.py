
from app.extensions import db

class Instance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    evolution_name = db.Column(db.String(120))
    company_id = db.Column(db.Integer, db.ForeignKey("company.id"))
    active = db.Column(db.Boolean, default=True)
