import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Ene", cursos: 50 },
    { name: "Feb", cursos: 60 },
    { name: "Mar", cursos: 70 },
    { name: "Abr", cursos: 80 },
    { name: "May", cursos: 90 },
    { name: "Jun", cursos: 100 },
    { name: "Jul", cursos: 110 },
];

export default function TotalCourses() {
    return (
        <div className="rounded-lg w-full h-full shadow-md bg-base-content p-4">
            <h2 className="text-lg font-semibold mb-4">Total de Cursos</h2>

            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="cursos" fill="#10b981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}