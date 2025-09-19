import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const users = [
  { name: "Ene", usuariosActivos: 300 },
  { name: "Feb", usuariosActivos: 350 },
  { name: "Mar", usuariosActivos: 400 },
  { name: "Abr", usuariosActivos: 450 },
  { name: "May", usuariosActivos: 500 },
  { name: "Jun", usuariosActivos: 550 },
  { name: "Jul", usuariosActivos: 600 },
];

const courses = [
  { name: "Ene", cursosActivos: 40 },
  { name: "Feb", cursosActivos: 50 },
  { name: "Mar", cursosActivos: 60 },
  { name: "Abr", cursosActivos: 70 },
  { name: "May", cursosActivos: 80 },
  { name: "Jun", cursosActivos: 90 },
  { name: "Jul", cursosActivos: 100 },
];

export default function ActiveCoursesVsUsers() {
  return (
    <div className="rounded-lg w-full h-full shadow-md bg-white p-4">
      <h2 className="text-lg font-semibold mb-4">
        Cursos Activos vs Usuarios Activos
      </h2>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={users}
              dataKey="usuariosActivos"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#10b981"
            />
            <Pie
              data={courses}
              dataKey="cursosActivos"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              fill="#3b82f6"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
