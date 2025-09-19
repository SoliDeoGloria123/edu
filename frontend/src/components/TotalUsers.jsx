import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Ene", usuarios: 4000 },
    { name: "Feb", usuarios: 3000 },
    { name: "Mar", usuarios: 2000 },
    { name: "Abr", usuarios: 2780 },
    { name: "May", usuarios: 1890 },
    { name: "Jun", usuarios: 2390 },
    { name: "Actual", usuarios: 3490 },
];

export default function TotalUsers() {
    return (
        <div className="rounded-lg w-full h-full bg-base-content p-4">
            <h2 className="text-lg font-semibold mb-4">Crecimiento en usuairos</h2>

            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="usuarios" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
