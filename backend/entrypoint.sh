#!/bin/sh

# Ejecutar migraciones
flask db upgrade

# Crear el superusuario
python create_superuser.py

# Iniciar la aplicación
python main.py