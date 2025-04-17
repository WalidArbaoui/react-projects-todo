import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import CreateProject from "./pages/CreateProject";
import CreateTask from "./pages/CreateTask";
import Footer from "./components/layout/Footer";
import SideBar from "./components/layout/SideBar";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Header />
      <main className="grid grid-cols-[auto_1fr] max-lg:block bg-light text-dark">
        <SideBar />
        <div className="flex flex-col p-6 min-lg:overflow-y-scroll">
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
        </div>
      </main>
      <Footer extraClassName="min-lg:hidden" />
    </>
  );
}

export default App;
