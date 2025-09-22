from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
MONGO_URL = os.getenv("MONGO_URL")

client = MongoClient(MONGO_URL)
db = client["EDU"]  # Usa el nombre de la base de datos de tu cadena de conexión
result = db["users"].delete_many({})
print(f"Usuarios eliminados: {result.deleted_count}")
