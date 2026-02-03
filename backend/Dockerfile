FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# Aseguramos permisos
RUN chmod +x entrypoint.sh

# CAMBIO AQUÍ: Usamos el entrypoint para coordinar el arranque
ENTRYPOINT ["./entrypoint.sh"]