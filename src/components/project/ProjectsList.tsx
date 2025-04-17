import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router-dom";
import { ProjectType } from "../../types/Project.type";
import { deleteProject } from "../../store/ProjectSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import SimpleModal from "../layout/SimpleModal";
import { useState } from "react";

type Props = {
  projects: ProjectType[];
  showDelete?: boolean;
};

const ProjectsList = ({ projects, showDelete = false }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [modal, setModal] = useState(false);
  const [project, setProject] = useState<ProjectType | undefined>(undefined);

  const handleDeleteClick = (project: ProjectType) => {
    setModal(true);
    setProject(project);
  };

  const handleDeleteAction = () => {
    if (project && project.id) {
      dispatch(deleteProject(project.id));
      setModal(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-2">
      {projects.map((project) => (
        <div
          className="grid grid-rows-[auto_1fr_auto] border border-gray-300 p-4"
          key={project.id}
        >
          <h3 className="flex gap-2">
            <Icon icon="lucide:box" width="24" height="24" />
            {project.name}
          </h3>
          <p className="text-gray-500 mb-4">
            {project.description || "(No Description)"}
          </p>
          <div className="flex items-center justify-between">
            <NavLink
              to={`/projects/${project.id}`}
              className="inline-flex gap-1 items-center py-1 px-4 outline outline-gray-300 rounded-full hover:bg-main hover:text-white hover:outline-none"
            >
              <Icon icon="octicon:tasklist-24" width="20" height="20" /> Tasks
            </NavLink>
            {showDelete && (
              <button
                onClick={() => handleDeleteClick(project)}
                className="flex gap-1 text-red-300 hover:text-red-600"
              >
                <Icon
                  icon="solar:trash-bin-minimalistic-linear"
                  width="24"
                  height="24"
                />
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
      <SimpleModal openModal={modal} closeModal={() => setModal(false)}>
        <div className="flex items-start gap-3 max-w-lg">
          <div className="p-2 bg-yellow-100 rounded-full">
            <Icon
              icon="material-symbols:warning-outline-rounded"
              width="32"
              height="32"
              className="-translate-y-0.5 text-yellow-600"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">Delete Project</h3>
            <p>Are you sure you want to delete "{project?.name}" project?</p>
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setModal(false)}
                className="border border-gray-200 rounded-lg py-1 px-4 hover:bg-black hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAction}
                className="flex items-center gap-1 border border-red-300 text-red-500 rounded-lg py-1 px-4 hover:bg-red-500 hover:text-white"
              >
                <Icon
                  icon="solar:trash-bin-minimalistic-linear"
                  width="18"
                  height="18"
                />
                Delete
              </button>
            </div>
          </div>
        </div>
      </SimpleModal>
    </div>
  );
};

export default ProjectsList;
