from backend.config.dbConfig import get_collection
from datetime import datetime

cursos = [
    {
        "title": "Matemáticas Básicas",
        "description": "Curso introductorio de matemáticas.",
        "instructor_id": 1,
        "category": "Matemáticas",
        "level": "beginner",
        "price": 0.0,
        "lessons": ["Números", "Operaciones básicas"],
        "tags": ["matemáticas", "básico"],
        "likes": 0,
        "dislikes": 0,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "is_active": True
    },
    {
        "title": "Historia Universal",
        "description": "Historia desde la antigüedad hasta la actualidad.",
        "instructor_id": 2,
        "category": "Historia",
        "level": "intermediate",
        "price": 10.0,
        "lessons": ["Antigüedad", "Edad Media", "Edad Moderna"],
        "tags": ["historia", "universal"],
        "likes": 0,
        "dislikes": 0,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "is_active": True
    },
    {
        "title": "Programación en Python",
        "description": "Aprende a programar desde cero en Python.",
        "instructor_id": 3,
        "category": "Programación",
        "level": "beginner",
        "price": 15.0,
        "lessons": ["Sintaxis básica", "Variables", "Funciones"],
        "tags": ["python", "programación"],
        "likes": 0,
        "dislikes": 0,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "is_active": True
    }
]

def seed_courses():
    collection = get_collection("Courses")
    result = collection.insert_many(cursos)
    print(f"Cursos insertados: {result.inserted_ids}")

if __name__ == "__main__":
    seed_courses()
