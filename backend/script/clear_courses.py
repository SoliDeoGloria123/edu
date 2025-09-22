from backend.config.dbConfig import get_collection

def clear_courses():
    collection = get_collection("Courses")
    result = collection.delete_many({})
    print(f"Cursos eliminados: {result.deleted_count}")

if __name__ == "__main__":
    clear_courses()
