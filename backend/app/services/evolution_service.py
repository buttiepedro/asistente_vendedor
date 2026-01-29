
import requests
from flask import current_app

class EvolutionService:

    @staticmethod
    def create_instance(name,webhook_url, number=None):
        url = f"https://evolution-api-production-58c5b.up.railway.app/instance/create"
        headers = {"apikey": "76aabb909d979783471de3b9e3d52348"}
        return requests.post(url, json={
            "instanceName": name,
            "number": number, 
            "qrcode": False,
            "integration": "WHATSAPP-BAILEYS",
            "webhook": {
                "url": webhook_url,
                "byEvents": True,
                "base64": True,
                "headers": {
                    "autorization": "Bearer TOKEN",
                    "Content-Type": "application/json"
                },
                "events": ["MESSAGES_UPSERT"]
            }
        }, headers=headers)

    @staticmethod
    def get_qr(name):
        url = f"https://evolution-api-production-58c5b.up.railway.app/instance/connect/{name}"
        headers = {"apikey": "76aabb909d979783471de3b9e3d52348"}
        response = requests.get(url, headers=headers)
        return response
    
    @staticmethod
    def logout_instance(name):
        url = f"https://evolution-api-production-58c5b.up.railway.app/instance/logout/{name}"
        headers = {"apikey": "76aabb909d979783471de3b9e3d52348"}
        response = requests.delete(url, headers=headers)
        return response
    
    @staticmethod
    def fetch_instances():
        url = f"https://evolution-api-production-58c5b.up.railway.app/instance/fetchInstances"
        headers = {"apikey": "76aabb909d979783471de3b9e3d52348"}
        response = requests.get(url, headers=headers)
        return response
    
    @staticmethod
    def delete_instance(name):
        url = f"https://evolution-api-production-58c5b.up.railway.app/instance/delete/{name}"
        headers = {"apikey": "76aabb909d979783471de3b9e3d52348"}
        response = requests.delete(url, headers=headers)
        return response
