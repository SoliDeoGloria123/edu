import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home type="login" />} />
                <Route path="/register" element={<Home type="register" />} />
                <Route path="/dashboard" element={<Index />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
