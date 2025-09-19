import ActiveCoursesVsUsers from "./components/ActiveCoursesVsUsers";
import TotalCourses from "./components/TotalCourses";
import TotalUsers from "./components/TotalUsers";

function App() {
    return (
        <div className="flex flex-col h-screen bg-base-100 p-6 space-y-10">
            <div className="flex w-full justify-center ">
                <h1 className="text-2xl">ESTADISTICAS PRINCIPALES</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-base-content rounded-lg">
                <div className="flex w-full flex-1 rounded-lg shadow-2xl">
                    <TotalUsers />
                </div>
                <div className="flex w-full  ">
                    <TotalCourses />
                </div>
                <div className="flex w-full  col-span-2">
                    <ActiveCoursesVsUsers />
                </div>
            </div>
        </div>
    );
}

export default App;
