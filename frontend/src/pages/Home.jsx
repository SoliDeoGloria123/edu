import React, { useState } from "react";
import { useMutationApi } from "../hooks/useApi";
import { useNavigate, Link } from "react-router-dom";

export default function Home({ type }) {
    const navigation = useNavigate();

    // Estados para login
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Estados para registro
    const [regName, setRegName] = useState("");
    const [regUsername, setRegUsername] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regConfirmPassword, setRegConfirmPassword] = useState("");
    const [regPhone, setRegPhone] = useState("");
    const [regError, setRegError] = useState("");

    const { mutate, loading, error } = useMutationApi("/users", "POST");

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegError("");

        // Validaciones
        if (regPassword.length < 6) {
            setRegError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }
        if (regPassword !== regConfirmPassword) {
            setRegError("Las contraseñas no coinciden.");
            return;
        }

        const userData = {
            name: regName,
            username: regUsername,
            email: regEmail,
            password: regPassword,
            phone: regPhone || undefined,
        };
        const result = await mutate(userData);
        if (result) {
            console.log("Usuario registrado:", result);
            // Opcional: redirigir a login o dashboard
            navigation("/");
        } else {
            console.error("Error al registrar:", error);
            setRegError(error?.message || "Error al registrar usuario. El email podría ya estar en uso.");
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword
            })
        });
        const data = await response.json();
        if (data.success) {
            // Guarda el token en localStorage
            localStorage.setItem("token", data.token);
            navigation("/dashboard");
        } else {
            alert(data.message || "Error de login");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-base-100 p-6 justify-center items-center">
            {type === "login" ? (
                <div className="card bg-base-100 shadow-2xl p-8 w-full max-w-md">
                    <div className="card-body">
                        <h2 className="card-title text-2xl font-bold text-center mb-6">
                            Iniciar Sesión
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label label-text" htmlFor="loginEmail">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    className="input input-bordered w-full"
                                    type="email"
                                    id="loginEmail"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label label-text" htmlFor="loginPassword">
                                    <span className="label-text">Contraseña</span>
                                </label>
                                <input
                                    className="input input-bordered w-full"
                                    type="password"
                                    id="loginPassword"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-full flex justify-center mt-6">
                                <button className="btn btn-primary btn-wide" type="submit">
                                    Iniciar Sesión
                                </button>
                            </div>
                            <p className="text-center mt-4">
                                ¿No tienes cuenta? <Link to="/register" className="link link-primary">Regístrate</Link>
                            </p>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="card bg-base-100 shadow-2xl p-8 w-full max-w-lg">
                    <div className="card-body">
                        <h2 className="card-title text-2xl font-bold text-center mb-6">
                            Registro de Usuario
                        </h2>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label label-text" htmlFor="regName">
                                        <span className="label-text">Nombre</span>
                                    </label>
                                    <input
                                        className="input input-bordered w-full"
                                        type="text"
                                        id="regName"
                                        value={regName}
                                        onChange={(e) => setRegName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label label-text" htmlFor="regUsername">
                                        <span className="label-text">Usuario</span>
                                    </label>
                                    <input
                                        className="input input-bordered w-full"
                                        type="text"
                                        id="regUsername"
                                        value={regUsername}
                                        onChange={(e) => setRegUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label label-text" htmlFor="regEmail">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    className="input input-bordered w-full"
                                    type="email"
                                    id="regEmail"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label label-text" htmlFor="regPassword">
                                    <span className="label-text">Contraseña</span>
                                </label>
                                <input
                                    className="input input-bordered w-full"
                                    type="password"
                                    id="regPassword"
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label label-text" htmlFor="regConfirmPassword">
                                    <span className="label-text">Confirmar Contraseña</span>
                                </label>
                                <input
                                    className="input input-bordered w-full"
                                    type="password"
                                    id="regConfirmPassword"
                                    value={regConfirmPassword}
                                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label label-text" htmlFor="regPhone">
                                    <span className="label-text">Teléfono (opcional)</span>
                                </label>
                                <input
                                    className="input input-bordered w-full"
                                    type="tel"
                                    id="regPhone"
                                    value={regPhone}
                                    onChange={(e) => setRegPhone(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex justify-center mt-6">
                                <button
                                    className="btn btn-primary btn-wide"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Registrando..." : "Registrar"}
                                </button>
                            </div>
                            {regError && (
                                <p className="text-error text-center mt-4">
                                    {regError}
                                </p>
                            )}
                            <p className="text-center mt-4">
                                ¿Ya tienes cuenta? <Link to="/" className="link link-primary">Inicia sesión</Link>
                            </p>
                         </form>
                    </div>
                </div>
            )}
        </div>
    );
}
