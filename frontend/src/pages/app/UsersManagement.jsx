import React, { useState } from "react";
import useGetApi, { useMutationApi } from "../../hooks/useApi";

export default function UsersManagement() {
    const { data, loading, reload } = useGetApi("/users");

    // Estados para el formulario de creación
    const [newName, setNewName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPhone, setNewPhone] = useState("");

    // Estados para edición
    const [selectedUser, setSelectedUser] = useState(null);
    const [editName, setEditName] = useState("");
    const [editUsername, setEditUsername] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editIsActive, setEditIsActive] = useState(true);

    const {
        mutate: createMutate,
        loading: createLoading,
        error: createError,
    } = useMutationApi("/users", "POST");
    const {
        mutate: deleteMutate,
        loading: deleteLoading,
        error: deleteError,
    } = useMutationApi(`/users/${selectedUser?._id}`, "DELETE");
    const {
        mutate: patchMutate,
        loading: patchLoading,
        error: patchError,
    } = useMutationApi(`/users/${selectedUser?._id}`, "PATCH");

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const userData = {
            name: newName,
            username: newUsername,
            email: newEmail,
            password: newPassword,
            phone: newPhone || undefined,
        };
        const result = await createMutate(userData);
        if (result) {
            console.log("Usuario creado:", result);
            // Limpiar formulario
            setNewName("");
            setNewUsername("");
            setNewEmail("");
            setNewPassword("");
            setNewPhone("");
            // Cerrar modal
            document.getElementById("myCreateModal").close();
            // Recargar lista
            reload();
        } else {
            console.error("Error al crear usuario:", createError);
        }
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setEditName(user.name);
        setEditUsername(user.username);
        setEditEmail(user.email);
        setEditPassword(user.password); // No mostrar contraseña existente por seguridad
        setEditPhone(user.phone || "");
        setEditIsActive(user.is_active);
        document.getElementById("myActionsModal").showModal();
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const userData = {
            name: editName,
            username: editUsername,
            email: editEmail,
            password: editPassword, // Requerido para PUT
            phone: editPhone || undefined,
            is_active: editIsActive,
        };
        const result = await patchMutate(userData);
        if (result) {
            console.log("Usuario actualizado:", result);
            document.getElementById("myActionsModal").close();
            reload();
        } else {
            console.error("Error al actualizar usuario:", patchError);
        }
    };

    const handleToggleActive = async () => {
        const updatedUser = { ...selectedUser, is_active: !selectedUser.is_active };
        delete updatedUser._id; // Remover _id ya que no se debe enviar
        const result = await patchMutate(updatedUser);
        if (result) {
            console.log("Estado cambiado:", result);
            document.getElementById("myActionsModal").close();
            reload();
        } else {
            console.error("Error al cambiar estado:", patchError);
        }
    };

    const handleDeleteUser = async () => {
        const result = await deleteMutate();
        if (result) {
            console.log("Usuario eliminado:", result);
            document.getElementById("myActionsModal").close();
            reload();
        } else {
            console.error("Error al eliminar usuario:", deleteError);
        }
    };

    if (loading) {
        return <div>Cargando usuarios...</div>;
    }

    const users = data?.users || [];

    return (
        <div className="container mx-auto p-4">
            <div className="flex w-full justify-between">
                <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
                <button
                    className="btn btn-success"
                    onClick={() => {
                        document.getElementById("myCreateModal").showModal();
                    }}
                >
                    Crear usuario
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Estado</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone || "N/A"}</td>
                                <td>
                                    <span
                                        className={`badge ${
                                            user.is_active ? "badge-success" : "badge-error"
                                        }`}
                                    >
                                        {user.is_active ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td>{user.rol}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => handleSelectUser(user)}
                                    >
                                        Acciones
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <dialog id="myCreateModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Crear Nuevo Usuario</h3>
                    <form onSubmit={handleCreateUser} className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label label-text" htmlFor="newName">
                                    <span className="label-text">Nombre</span>
                                </label>
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    id="newName"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label label-text" htmlFor="newUsername">
                                    <span className="label-text">Usuario</span>
                                </label>
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    id="newUsername"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label label-text" htmlFor="newEmail">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                className="input input-bordered w-full"
                                type="email"
                                id="newEmail"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label label-text" htmlFor="newPassword">
                                <span className="label-text">Contraseña</span>
                            </label>
                            <input
                                className="input input-bordered w-full"
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label label-text" htmlFor="newPhone">
                                <span className="label-text">Teléfono (opcional)</span>
                            </label>
                            <input
                                className="input input-bordered w-full"
                                type="tel"
                                id="newPhone"
                                value={newPhone}
                                onChange={(e) => setNewPhone(e.target.value)}
                            />
                        </div>
                        <div className="modal-action">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={createLoading}
                            >
                                {createLoading ? "Creando..." : "Crear Usuario"}
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

            <dialog id="myActionsModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Acciones para {selectedUser?.name}</h3>
                    <div className="flex gap-2 mt-4 justify-center items-center">
                        <button
                            className="btn btn-info"
                            onClick={() =>
                                document.getElementById("editForm").classList.toggle("hidden")
                            }
                        >
                            Editar
                        </button>
                        <button className="btn btn-warning" onClick={handleToggleActive}>
                            {selectedUser?.is_active ? "Desactivar" : "Activar"}
                        </button>
                        <button
                            className="btn btn-error"
                            onClick={() =>
                                document.getElementById("deleteConfirm").classList.toggle("hidden")
                            }
                        >
                            Eliminar
                        </button>
                    </div>

                    <form
                        id="editForm"
                        onSubmit={handleUpdateUser}
                        className="space-y-4 mt-4 hidden"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label label-text" htmlFor="editName">
                                    <span className="label-text">Nombre</span>
                                </label>
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    id="editName"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label label-text" htmlFor="editUsername">
                                    <span className="label-text">Usuario</span>
                                </label>
                                <input
                                    className="input input-bordered w-full"
                                    type="text"
                                    id="editUsername"
                                    value={editUsername}
                                    onChange={(e) => setEditUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label label-text" htmlFor="editEmail">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                className="input input-bordered w-full"
                                type="email"
                                id="editEmail"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control hidden">
                            <label className="label label-text" htmlFor="editPassword">
                                <span className="label-text">
                                    Contraseña (requerida para actualizar)
                                </span>
                            </label>
                            <input
                                className="input input-bordered w-full hidden"
                                type="password"
                                id="editPassword"
                                value={editPassword}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label label-text" htmlFor="editPhone">
                                <span className="label-text">Teléfono (opcional)</span>
                            </label>
                            <input
                                className="input input-bordered w-full"
                                type="tel"
                                id="editPhone"
                                value={editPhone}
                                onChange={(e) => setEditPhone(e.target.value)}
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
                                {patchLoading ? "Actualizando..." : "Actualizar Usuario"}
                            </button>
                        </div>
                        {patchError && (
                            <p className="text-error text-center mt-4">
                                Error: {patchError.message}
                            </p>
                        )}
                    </form>

                    <div id="deleteConfirm" className="mt-4 hidden">
                        <p>¿Estás seguro de que quieres eliminar a {selectedUser?.name}?</p>
                        <div className="modal-action">
                            <button
                                className="btn btn-error"
                                onClick={handleDeleteUser}
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? "Eliminando..." : "Sí, Eliminar"}
                            </button>
                            <button
                                className="btn"
                                onClick={() =>
                                    document.getElementById("deleteConfirm").classList.add("hidden")
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
