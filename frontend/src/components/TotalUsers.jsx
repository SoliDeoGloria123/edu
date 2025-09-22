import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import useGetApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function TotalUsers() {
    const [chartData, setChartData] = useState([
        { name: "Ene", usuarios: 1 },
        { name: "Feb", usuarios: 3 },
        { name: "Mar", usuarios: 2 },
        { name: "Abr", usuarios: 5 },
        { name: "May", usuarios: 9 },
        { name: "Jun", usuarios: 7 },
        { name: "Actual", usuarios: 10 },
    ]);

    const { data, loading } = useGetApi("users/stats/total");

    useEffect(() => {
        if (data?.total_users) {
            setChartData((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { ...copy[copy.length - 1], usuarios: data?.total_users };
                return copy;
            });
        }
    }, [data]);

    return (
        <div className="rounded-lg w-full h-full shadow-md p-4 bg-base-100 ">
            <h2 className="text-xl font-bold mb-4 text-content">Crecimiento en usuaros</h2>

            <div className="w-full h-80">
                {loading ? (
                    <Loading size={"xl"} />
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="usuarios" fill="#3b82f6" radius={[10, 3, 10, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
