
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from config.dbConfig import init_db
from Models.users import User

def seed_users():
    users = [
        User(name="Juan", username="juan123", email="juan@example.com", password="1234", activo=True),
        User(name="Ana", username="ana456", email="ana@example.com", password="abcd", activo=True),
        User(name="Luis", username="luis789", email="luis@example.com", password="pass", activo=False),
        User(name="Maria", username="maria321", email="maria@example.com", password="maria", activo=True),
        User(name="Pedro", username="pedro654", email="pedro@example.com", password="pedro", activo=False)
    ]
    for user in users:
        init_db("users", user)

if __name__ == "__main__":
    seed_users()
