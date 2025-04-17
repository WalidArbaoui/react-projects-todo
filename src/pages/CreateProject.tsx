import { Icon } from "@iconify/react/dist/iconify.js";
import Modal from "../components/layout/Modal";
import { useState } from "react";
import { ProjectType } from "../types/Project.type";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { createProject } from "../store/ProjectSlice";

type Props = {};

const AddProject = (props: Props) => {
  const initialForm = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState<ProjectType>(initialForm);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(createProject(formData));
    if (error) {
      setError(error);
    }
    setFormData(initialForm);
  };

  return (
    <Modal title="Create Project">
      <div className="flex flex-col grow">
        <div className="py-8">
          <Icon
            icon="mage:box-3d-plus"
            className="mx-auto"
            width="82"
            height="82"
          />
        </div>
        <form
          method="post"
          className="flex flex-col px-6 pb-6 grow"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col grow">
            <label htmlFor="projectName">Name</label>
            <input
              type="text"
              id="projectName"
              className="border border-gray-300 rounded p-2 focus:outline-main-light"
              placeholder="Project Name"
              value={formData.name}
              onChange={handleChange}
              name="name"
            />
            <label htmlFor="projectDescription">Description</label>
            <textarea
              className="border border-gray-300 rounded p-2 focus:outline-main-light max-h-80 min-h-20"
              id="projectDescription"
              value={formData.description}
              onChange={handleChange}
              name="description"
            ></textarea>
            <p>{error}</p>
          </div>
          <button className="p-1 rounded outline outline-gray-300 hover:bg-main hover:text-white">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddProject;
