
import requests
from flask import current_app

class EvolutionService:

    @staticmethod
    def create_instance(name):
        url = f"{current_app.config['EVOLUTION_API_URL']}/instance/create"
        headers = {"apikey": current_app.config['EVOLUTION_API_KEY']}
        return requests.post(url, json={"instanceName": name}, headers=headers)

    @staticmethod
    def get_qr(name):
        url = f"{current_app.config['EVOLUTION_API_URL']}/instance/connect/{name}"
        headers = {"apikey": current_app.config['EVOLUTION_API_KEY']}
        return requests.get(url, headers=headers)
