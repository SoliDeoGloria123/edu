import React, { useState } from "react";
import useGetApi, { useMutationApi } from "../../hooks/useApi";

export default function CoursesManagement() {
    const { data, loading, reload } = useGetApi("/courses");

    // Estados para el formulario de creación
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [newLevel, setNewLevel] = useState("beginner");
    const [newPrice, setNewPrice] = useState(0.0);

    // Estados para edición
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [editCourseTittle, setEditCoruseTittle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editLevel, setEditLevel] = useState("beginner");
    const [editPrice, setEditPrice] = useState(0.0);
    const [editIsActive, setEditIsActive] = useState(true);

    const {
        mutate: createMutate,
        loading: createLoading,
        error: createError,
    } = useMutationApi("/courses", "POST");
    const {
        mutate: deleteMutate,
        loading: deleteLoading,
        error: deleteError,
    } = useMutationApi(`/courses/${selectedCourse?._id}`, "DELETE");
    const {
        mutate: patchMutate,
        loading: patchLoading,
        error: patchError,
    } = useMutationApi(`/courses/${selectedCourse?._id}`, "PATCH");

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        const courseData = {
            title: newTitle,
            description: newDescription || undefined,
            category: newCategory || undefined,
            level: newLevel,
            price: parseFloat(newPrice) || 0.0,
        };
        const result = await createMutate(courseData);
        if (result) {
            console.log("Curso creado:", result);
            // Limpiar formulario
            setNewTitle("");
            setNewDescription("");
            setNewCategory("");
            setNewLevel("beginner");
            setNewPrice(0.0);
            // Cerrar modal
            document.getElementById("myCreateCourseModal").close();
            // Recargar lista
            reload();
        } else {
            console.error("Error al crear curso:", createError);
        }
    };

    const handleSelectCourse = (course) => {
        setSelectedCourse(course);
        setEditCoruseTittle(course.title);
        setEditDescription(course.description || "");
        setEditCategory(course.category || "");
        setEditLevel(course.level || "beginner");
        setEditPrice(course.price || 0.0);
        setEditIsActive(course.is_active);
        document.getElementById("myActionsCourseModal").showModal();
    };

    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        const courseData = {
            title: editCourseTittle,
            description: editDescription || undefined,
            category: editCategory || undefined,
            level: editLevel,
            price: parseFloat(editPrice) || 0.0,
            is_active: editIsActive,
        };
        console.log("Enviando PATCH para actualizar curso:", courseData);
        const result = await patchMutate(courseData);
        if (result) {
            console.log("Curso actualizado:", result);
            document.getElementById("myActionsCourseModal").close();
            reload();
        } else {
            console.error("Error al actualizar curso:", patchError);
        }
    };

    const handleToggleActive = async () => {
        const updatedCourse = { ...selectedCourse, is_active: !selectedCourse.is_active };
        delete updatedCourse._id; // Remover _id ya que no se debe enviar
        console.log("Enviando PATCH para toggle activo:", updatedCourse);
        const result = await patchMutate(updatedCourse);
        if (result) {
            console.log("Estado cambiado:", result);
            document.getElementById("myActionsCourseModal").close();
            reload();
        } else {
            console.error("Error al cambiar estado:", patchError);
        }
    };

    const handleDeleteCourse = async () => {
        console.log("Enviando DELETE para curso:", selectedCourse?._id);
        const result = await deleteMutate();
        if (result) {
            console.log("Curso eliminado:", result);
            document.getElementById("myActionsCourseModal").close();
            reload();
        } else {
            console.error("Error al eliminar curso:", deleteError);
        }
    };

    if (loading) {
        return <div>Cargando cursos...</div>;
    }

    const courses = data?.courses || [];

    return (
        <div className="container mx-auto p-4">
            <div className="flex w-full justify-between">
                <h1 className="text-2xl font-bold mb-4">Gestión de Cursos</h1>
                <button
                    className="btn btn-success"
                    onClick={() => {
                        document.getElementById("myCreateCourseModal").showModal();
                        console.log("hola");
                    }}
                >
                    Crear curso
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Categoría</th>
                            <th>Nivel</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course._id}>
                                <td>{course.title}</td>
                                <td>{course.description || "N/A"}</td>
                                <td>{course.category || "N/A"}</td>
                                <td>{course.level}</td>
                                <td>${course.price}</td>
                                <td>
                                    <span
                                        className={`badge ${
                                            course.is_active ? "badge-success" : "badge-error"
                                        }`}
                                    >
                                        {course.is_active ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => handleSelectCourse(course)}
                                    >
                                        Acciones
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <dialog id="myCreateCourseModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Crear Nuevo Curso</h3>
                    <form onSubmit={handleCreateCourse} className="space-y-4 mt-4">
                        <div className="form-control">
                            <label className="label label-text" htmlFor="newTitle">
                                <span className="label-text">Título</span>
                            </label>
                            <input
                                className="input input-bordered w-full"
                                type="text"
                                id="newTitle"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label label-text" htmlFor="newDescription">
                                <span className="label-text">Descripción (opcional)</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                id="newDescription"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label label-text" htmlFor="newCategory">
                                    <span className="label-text">Categoría (opcional)</span>
                                </label>
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    id="newCategory"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label label-text" htmlFor="newLevel">
                                    <span className="label-text">Nivel</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    id="newLevel"
                                    value={newLevel}
                                    onChange={(e) => setNewLevel(e.target.value)}
                                >
                                    <option value="beginner">Principiante</option>
                                    <option value="intermediate">Intermedio</option>
                                    <option value="advanced">Avanzado</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label label-text" htmlFor="newPrice">
                                <span className="label-text">Precio</span>
                            </label>
                            <input
                                className="input input-bordered w-full"
                                type="number"
                                step="0.01"
                                id="newPrice"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                            />
                        </div>
                        <div className="modal-action">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={createLoading}
                            >
                                {createLoading ? "Creando..." : "Crear Curso"}
                            </button>
                        </div>
                        {createError && (
                            <p className="text-error text-center mt-4">
                                Error: {createError.message}
                            </p>
                        )}
                    </form>
                </div>
            </dialog>

            <dialog id="myActionsCourseModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Acciones para {selectedCourse?.title}</h3>
                    <div className="flex gap-2 mt-4 justify-center items-center">
                        <button
                            className="btn btn-info"
                            onClick={() =>
                                document.getElementById("editCoruseForm").classList.toggle("hidden")
                            }
                        >
                            Editar
                        </button>
                        <button className="btn btn-warning" onClick={handleToggleActive}>
                            {selectedCourse?.is_active ? "Desactivar" : "Activar"}
                        </button>
                        <button
                            className="btn btn-error"
                            onClick={() =>
                                document
                                    .getElementById("deleteCourseConfirm")
                                    .classList.toggle("hidden")
                            }
                        >
                            Eliminar
                        </button>
                    </div>

                    <form
                        id="editCoruseForm"
                        onSubmit={handleUpdateCourse}
                        className="space-y-4 mt-4 hidden"
                    >
                        <div className="form-control">
                            <label className="label label-text" htmlFor="editCourseTittle">
                                <span className="label-text">Título</span>
                            </label>
                            <input
                                className="input input-bordered w-full"
                                type="text"
                                id="editCourseTittle"
                                value={editCourseTittle}
                                onChange={(e) => setEditCoruseTittle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label label-text" htmlFor="editDescription">
                                <span className="label-text">Descripción (opcional)</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                id="editDescription"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label label-text" htmlFor="editCategory">
                                    <span className="label-text">Categoría (opcional)</span>
                                </label>
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    id="editCategory"
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label label-text" htmlFor="editLevel">
                                    <span className="label-text">Nivel</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    id="editLevel"
                                    value={editLevel}
                                    onChange={(e) => setEditLevel(e.target.value)}
                                >
                                    <option value="beginner">Principiante</option>
                                    <option value="intermediate">Intermedio</option>
                                    <option value="advanced">Avanzado</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label label-text" htmlFor="editPrice">
                                <span className="label-text">Precio</span>
                            </label>
                            <input
                                className="input input-bordered w-full"
                                type="number"
                                step="0.01"
                                id="editPrice"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Estado</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={editIsActive ? "true" : "false"}
                                onChange={(e) => setEditIsActive(e.target.value === "true")}
                            >
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>
                        <div className="modal-action">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={patchLoading}
                            >
                                {patchLoading ? "Actualizando..." : "Actualizar Curso"}
                            </button>
                        </div>
                        {patchError && (
                            <p className="text-error text-center mt-4">
                                Error: {patchError.message}
                            </p>
                        )}
                    </form>

                    <div id="deleteCourseConfirm" className="mt-4 hidden">
                        <p>
                            ¿Estás seguro de que quieres eliminar el curso "{selectedCourse?.title}
                            "?
                        </p>
                        <div className="modal-action">
                            <button
                                className="btn btn-error"
                                onClick={handleDeleteCourse}
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? "Eliminando..." : "Sí, Eliminar"}
                            </button>
                            <button
                                className="btn"
                                onClick={() =>
                                    document
                                        .getElementById("deleteCourseConfirm")
                                        .classList.add("hidden")
                                }
                            >
                                Cancelar
                            </button>
                        </div>
                        {deleteError && (
                            <p className="text-error text-center mt-4">
                                Error: {deleteError.message}
                            </p>
                        )}
                    </div>
                </div>
            </dialog>
        </div>
    );
}
