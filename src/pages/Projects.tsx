import { Icon } from "@iconify/react/dist/iconify.js";
import ProjectsList from "../components/project/ProjectsList";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import {
  deleteProject,
  fetchProjects,
  getAllProjects,
} from "../store/ProjectSlice";
import { useEffect } from "react";

type Props = {};

const Projects = (props: Props) => {
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector(getAllProjects);

  useEffect(() => {
    if (projects.length <= 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch]);

  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-2xl mb-2">Projects</h1>
        <Link
          to="/projects/add"
          state={{ background: location }}
          className="flex items-center gap-1 py-1 pl-2 pr-4 rounded-full outline outline-gray-300 hover:bg-main hover:text-white hover:outline-none"
        >
          <Icon icon="ic:round-plus" width="24" height="24" />
          Create Project
        </Link>
      </div>
      <section>
        <ProjectsList projects={projects} showDelete />
      </section>
      <Outlet />
    </>
  );
};

export default Projects;
