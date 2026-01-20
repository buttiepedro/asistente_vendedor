
from app.extensions import db

class PhoneLine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.String(30))
    instance_id = db.Column(db.Integer, db.ForeignKey("instance.id"))
    company_id = db.Column(db.Integer, db.ForeignKey("company.id"))
