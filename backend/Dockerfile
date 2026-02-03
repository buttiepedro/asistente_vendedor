FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# Aseguramos permisos
RUN chmod +x entrypoint.sh

# CAMBIO: Usamos /bin/sh explícitamente para lanzar el script
CMD ["/bin/sh", "./entrypoint.sh"]