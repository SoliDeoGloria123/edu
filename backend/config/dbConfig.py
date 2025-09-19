
from dotenv import load_dotenv
from pymongo import MongoClient
import os

def get_connection_string(URL: str) -> str:
    load_dotenv()
    return os.getenv(URL)

def init_client() -> MongoClient:
    return MongoClient(get_connection_string("MONGO_URL"))

def create_db(client: MongoClient):
    return client.EDU

def create_collection(db, collection_name):
    return db[collection_name]

# Función principal para insertar un modelo en la colección
def init_db(collection_name: str, model_instance) -> dict:
    from datetime import datetime
    doc = model_instance.__dict__
    if 'created_at' in doc and not doc['created_at']:
        doc['created_at'] = datetime.utcnow()
    if 'updated_at' in doc and not doc['updated_at']:
        doc['updated_at'] = datetime.utcnow()
    return create_collection(create_db(init_client()), collection_name).insert_one(doc)

# Funciones específicas para crear, leer, actualizar y eliminar usuarios
def get_users_collection():
    return create_collection(create_db(init_client()), "users")

def list_users():
    return list(get_users_collection().find({}))

def count_users():
    return get_users_collection().count_documents({})

def count_users_by_status(status: bool):
    return get_users_collection().count_documents({"activo": status})

def update_user_in_db(user_id: str, data: dict):
    from datetime import datetime
    data['updated_at'] = datetime.utcnow()
    return get_users_collection().update_one({"_id": user_id}, {"$set": data})

def delete_user_in_db(user_id: str):
    return get_users_collection().delete_one({"_id": user_id})