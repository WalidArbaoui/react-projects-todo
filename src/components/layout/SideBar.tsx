import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, getAllProjects } from "../../store/ProjectSlice";
import { ProjectType } from "../../types/Project.type";
import { AppDispatch } from "../../store";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Footer from "./Footer";
import DarkModeToggle from "../DarkModeToggle";

type Props = {};

const SideBar = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector(getAllProjects);

  useEffect(() => {
    if (projects.length <= 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch]);

  return (
    <aside className="flex flex-col justify-between border-r border-gray-200 bg-dark-light pt-4">
      <div className="">
        <h3 className="flex items-center gap-1 font-bold pt-1 px-2">
          <Icon icon="cuida:box-outline" width="24" height="24" /> Projects
        </h3>
        <ul className="p-2">
          {projects.map((project) => (
            <li>
              <NavLink
                to={`/projects/${project.id}`}
                className={({ isActive }) =>
                  `${
                    isActive && "bg-gray-300"
                  } block py-1 px-2 rounded-md hover:bg-gray-200`
                }
              >
                {project.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-1">
        <DarkModeToggle />
        <Footer />
      </div>
    </aside>
  );
};

export default SideBar;
