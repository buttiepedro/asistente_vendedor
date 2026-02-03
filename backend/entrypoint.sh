#!/bin/sh
flask db upgrade
python create_superuser.py
python main.py