import Dashboard from "./app/Dashboard";
import UsersManagement from "./app/UsersManagement";
import CoursesManagement from "./app/CoursesManagement";

export default function Index() {
    return (
        <div className="flex flex-col h-screen max-h-[100vh] bg-base-100 p-6 space-y-10">
            <div className="tabs tabs-lift">
                <input
                    type="radio"
                    name="my_tabs_3"
                    className="tab"
                    aria-label="Panel de estadisticas"
                    defaultChecked
                />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <Dashboard />
                </div>
                <input
                    type="radio"
                    name="my_tabs_3"
                    className="tab"
                    aria-label="Administracion de usuarios"
                />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <UsersManagement />
                </div>
                <input
                    type="radio"
                    name="my_tabs_3"
                    className="tab"
                    aria-label="Administracion de cursos"
                />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <CoursesManagement />
                </div>
            </div>
        </div>
    );
}
