import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebLayout from "./layouts/WebLayout";
import AdminLayout from "./layouts/AdminLayout";
import About from "./pages/web/About";
import Home from "./pages/web/Home"
import Dashboard from "./pages/admin/Dashboard"
import Settings from "./pages/admin/Settings"


function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<WebLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="/dashboard" element={<AdminLayout />}>

            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>



        </Routes>
      </Router>
    </>
  );
}

export default App;