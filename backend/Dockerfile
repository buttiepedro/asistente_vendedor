FROM python:3.11-slim

# Dependencias para PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Dar permisos de ejecución al script de inicio
RUN chmod +x entrypoint.sh

# Usar el script como el comando principal
CMD ["./entrypoint.sh"]