import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import useGetApi from "../hooks/useApi";
import { useEffect, useState } from "react";

export default function ActiveCoursesVsUsers() {
    const [combinedData, setCombinedData] = useState([
        { name: "Ene", activos: 300, inactivos: 40 },
        { name: "Feb", activos: 350, inactivos: 50 },
        { name: "Mar", activos: 400, inactivos: 60 },
        { name: "Abr", activos: 450, inactivos: 70 },
        { name: "May", activos: 500, inactivos: 80 },
        { name: "Jun", activos: 550, inactivos: 90 },
        { name: "Actual", activos: 0, inactivos: 0 },
    ]);

    // Datos de la API
    const { data: activeUsersApi } = useGetApi("users/stats/active");
    const { data: inactiveUsersApi } = useGetApi("users/stats/inactive");

    // Actualizar usuarios activos
    useEffect(() => {
        if (activeUsersApi?.active_users) {
            setCombinedData((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = {
                    ...copy[copy.length - 1],
                    activos: activeUsersApi.active_users,
                };
                console.log(activeUsersApi);
                return copy;
            });
        }
    }, [activeUsersApi]);

    // Actualizar usuarios inactivos
    useEffect(() => {
        if (inactiveUsersApi?.inactive_users) {
            setCombinedData((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = {
                    ...copy[copy.length - 1],
                    inactivos: inactiveUsersApi.inactive_users,
                };
                return copy;
            });
        }
    }, [inactiveUsersApi]);

    return (
        <div className="rounded-lg h-full shadow-md p-4 bg-base-100">
            <h2 className="text-xl font-bold mb-4 text-content">Usuarios Activos vs Inactivos</h2>

            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={combinedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value) => {
                                if (value === "activos") return "Usuarios Activos";
                                if (value === "inactivos") return "Usuarios Inactivos";
                                return value;
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="activos"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="inactivos"
                            stroke="#ef4444"
                            strokeWidth={3}
                            dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
