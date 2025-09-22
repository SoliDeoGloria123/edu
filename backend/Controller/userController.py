from bson import ObjectId
from fastapi import FastAPI
from config.dbConfig import init_db as db, list_users, count_users, count_users_by_status, update_user_in_db, delete_user_in_db
from Models.users import User, UserLogin
from config.security import hash_password as hasheo , verify_password
import jwt
import os
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

SECRET = str(os.getenv("SECRET"))

@app.get("/users")
def read_users():
    print('GET /users')
    users = list_users()
    for user in users:
        if '_id' in user:
            user['_id'] = str(user['_id'])
    return {"success": True, "users": users, "status_code": 200}

@app.post("/users")
def create_user(user: User):
    print(f'POST /users with data: {user}')
    user.password = hasheo(user.password) 
    result = db("users", user)
    return {"success": True, "inserted_id": str(result.inserted_id), "status_code": 201}

@app.put("/users/{user_id}")
def update_user(user_id: str, user: User):
    print(f'PUT /users/{user_id} with data: {user}')
    user.password = hasheo(user.password) 
    result = update_user_in_db(ObjectId(user_id), user.dict())
    return {"success": True, "matched_count": result.matched_count, "modified_count": result.modified_count, "status_code": 200}

@app.delete("/users/{user_id}")
def delete_user(user_id: str):
    print(f'DELETE /users/{user_id}')
    result = delete_user_in_db(ObjectId(user_id))
    return {"success": True, "deleted_count": result.deleted_count, "status_code": 200}

@app.patch("/users/{user_id}")
def patch_user(user_id: str, user: User):
    print(f'PATCH /users/{user_id} with data: {user}')
    result = update_user_in_db(ObjectId(user_id), user.dict())
    return {"success": True, "matched_count": result.matched_count, "modified_count": result.modified_count, "status_code": 200}

"""
MODÚLO DE ESTADISTICAS DE USUARIOS
"""

@app.get("/users/stats/total")
def total_users():
    print('GET /users/stats/total')
    result = list_users()
    print(f'Total users: {len(result)}')
    print("---")
    print({"success": True, "total_users": len(result), "status_code": 200})
    print("---")
    return {"success": True, "total_users": len(result), "status_code": 200}

@app.get("/users/stats/active")
def active_users():
    print('GET /users/stats/active')
    result = count_users_by_status(True)
    print(f'Active users: {result}')
    print("---")
    print({"success": True, "active_users": result, "status_code": 200})
    print("---")
    return {"success": True, "active_users": result, "status_code": 200}

@app.get("/users/stats/inactive")
def inactive_users():
    print('GET /users/stats/inactive')
    result = count_users_by_status(False)
    print(f'Inactive users: {result}')
    print("---")
    print({"success": True, "inactive_users": result, "status_code": 200})
    print("---")
    return {"success": True, "inactive_users": result, "status_code": 200}

# Controlador para el login de usuarios
@app.post("/login")
def login_user(user: UserLogin):
    for users in list_users():
        if users['email'] == user.email:
            if verify_password(user.password, users['password']):
                token = jwt.encode({"email": user.email}, SECRET, algorithm="HS256")
                return {"success": True, "message": "Login Exitoso", "token": token, "status_code": 200}
            else:
                return {"success": False, "message": "Contraseña incorrecta", "status_code": 401}
    return {"success": False, "message": "Usuario no encontrado", "status_code": 404}

# Controlador para registrar usuarios
@app.post("/register")
def register_user(user: User):
    print(f'POST /register with data: {user}')
    user.password = hasheo(user.password) 
    result = db("users", user)
    return {"success": True, "inserted_id": str(result.inserted_id), "status_code": 201}
