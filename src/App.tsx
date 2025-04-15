import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import CreateProject from "./pages/CreateProject";
import CreateTask from "./pages/CreateTask";
import Footer from "./components/layout/Footer";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Header />
      <main className="flex flex-col px-6">
        <Routes location={background || location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<Tasks />} />
        </Routes>
        {background && (
          <Routes>
            <Route path="/projects/add" element={<CreateProject />} />
            <Route path="/projects/:id/add" element={<CreateTask />} />
          </Routes>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
