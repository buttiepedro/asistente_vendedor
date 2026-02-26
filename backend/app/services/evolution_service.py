
import requests
import os
from flask import current_app



class EvolutionService:
    EVOLUTION_API_URL = os.getenv("EVOLUTION_API_URL")
    EVOLUTION_API_KEY = os.getenv("EVOLUTION_API_KEY")

    @staticmethod
    def create_instance(name,webhook_url, number=None):
        url = f"{EvolutionService.EVOLUTION_API_URL}/instance/create"
        headers = {"apikey": EvolutionService.EVOLUTION_API_KEY}
        payload = {
        "instanceName": name,
        "qrcode": False,
        "integration": "WHATSAPP-BAILEYS",
        "webhook": {
            "url": webhook_url,
            "byEvents": False,
            "base64": True,
            "headers": {
                "autorization": "Bearer TOKEN",
                "Content-Type": "application/json"
            },
            "events": ["MESSAGES_UPSERT"]
            }
        }

        # 2. Solo agregamos el número si el usuario lo proporcionó
        if number:
            payload["number"] = number

        response = requests.post(url, json=payload, headers=headers)
        return response

    @staticmethod
    def get_qr(name):
        url = f"{EvolutionService.EVOLUTION_API_URL}/instance/connect/{name}"
        headers = {"apikey": EvolutionService.EVOLUTION_API_KEY}
        response = requests.get(url, headers=headers)
        return response
    
    @staticmethod
    def logout_instance(name):
        url = f"{EvolutionService.EVOLUTION_API_URL}/instance/logout/{name}"
        headers = {"apikey": EvolutionService.EVOLUTION_API_KEY}
        response = requests.delete(url, headers=headers)
        return response
    
    @staticmethod
    def fetch_instances():
        url = f"{EvolutionService.EVOLUTION_API_URL}/instance/fetchInstances"
        headers = {"apikey": EvolutionService.EVOLUTION_API_KEY}
        response = requests.get(url, headers=headers)
        return response
    
    @staticmethod
    def delete_instance(name):
        url = f"{EvolutionService.EVOLUTION_API_URL}/instance/delete/{name}"
        headers = {"apikey": EvolutionService.EVOLUTION_API_KEY}
        response = requests.delete(url, headers=headers)
        return response
