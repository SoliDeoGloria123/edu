from fastapi import APIRouter
from Models.courses import Course
from config.dbConfig import get_collection
from bson import ObjectId

router = APIRouter()


@router.get("/courses")
def read_courses():
    print('GET /courses')
    cursos = list(get_collection("Courses").find({}))
    for curso in cursos:
        if '_id' in curso:
            curso['_id'] = str(curso['_id'])
    return {"success": True, "courses": cursos, "status_code": 200}

@router.post("/courses")
def create_course(course: Course):
    print('POST /courses')
    get_collection("Courses").insert_one(course.dict())
    return {"success": True, "course": course, "status_code": 201}

@router.get("/courses/{course_id}")
def read_course(course_id: str):
    print(f'GET /courses/{course_id}')
    course = get_collection("Courses").find_one({"_id": ObjectId(course_id)})
    if course and '_id' in course:
        course['_id'] = str(course['_id'])
        return {"success": True, "course": course, "status_code": 200}
    else:
        return {"success": False, "course": None, "status_code": 404}

@router.put("/courses/{course_id}")
def update_course(course_id: str, course: Course):
    print(f'PUT /courses/{course_id} with data: {course}')
    try:
        result = get_collection("Courses").update_one({"_id": ObjectId(course_id)}, {"$set": course.dict()})
        print(f'PUT result: matched={result.matched_count}, modified={result.modified_count}')
        return {"success": True, "matched_count": result.matched_count, "modified_count": result.modified_count, "status_code": 200}
    except Exception as e:
        print(f'PUT error: {e}')
        return {"success": False, "error": str(e), "status_code": 500}

@router.delete("/courses/{course_id}")
def delete_course(course_id: str):
    print(f'DELETE /courses/{course_id}')
    try:
        result = get_collection("Courses").delete_one({"_id": ObjectId(course_id)})
        print(f'DELETE result: deleted={result.deleted_count}')
        return {"success": True, "deleted_count": result.deleted_count, "status_code": 200}
    except Exception as e:
        print(f'DELETE error: {e}')
        return {"success": False, "error": str(e), "status_code": 500}

@router.patch("/courses/{course_id}")
def patch_course(course_id: str, course: Course):
    print(f'PATCH /courses/{course_id} with data: {course}')
    try:
        result = get_collection("Courses").update_one({"_id": ObjectId(course_id)}, {"$set": course.dict()})
        print(f'PATCH result: matched={result.matched_count}, modified={result.modified_count}')
        return {"success": True, "matched_count": result.matched_count, "modified_count": result.modified_count, "status_code": 200}
    except Exception as e:
        print(f'PATCH error: {e}')
        return {"success": False, "error": str(e), "status_code": 500}