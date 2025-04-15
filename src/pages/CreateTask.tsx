import { useState } from "react";
import Modal from "../components/layout/Modal";
import { TaskPriority, TaskStatus } from "../enum/Task.enum";
import { TaskType } from "../types/Task.type";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { createTask } from "../store/TaskSlice";
import { useParams } from "react-router-dom";
import { DashboardCards } from "../config/style.config";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {};

const CreateTask = (props: Props) => {
  const params = useParams();
  const initialForm = {
    title: "",
    description: "",
    status: TaskStatus.ToDo,
    priority: TaskPriority.Medium,
  };
  const [formData, setFormData] = useState<TaskType>(initialForm);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(createTask({ ...formData, projectId: Number(params.id) }));
    setFormData(initialForm);
    if (error) {
      setError(error);
    }
  };
  return (
    <Modal title="Create Task">
      <form
        method="post"
        className="flex flex-col px-6 pb-6 grow"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 grow">
          <label htmlFor="taskTitle">Title</label>
          <input
            type="text"
            id="taskTitle"
            className="border border-gray-300 rounded p-2 focus:outline-main-light"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            name="title"
          />
          <div>
            <label htmlFor="taskStatus" className="mr-2">
              Status
            </label>
            <select
              id="taskStatus"
              value={formData.status}
              onChange={handleChange}
              name="status"
            >
              {Object.entries(TaskStatus).map(([key, value]) => (
                <option value={value}>{key}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="taskPriority" className="mr-2">
              Priority
            </label>
            <select
              id="TaskPriority"
              value={formData.priority}
              onChange={handleChange}
              name="priority"
            >
              {Object.entries(TaskPriority).map(([key, value]) => (
                <option value={value}>{key}</option>
              ))}
            </select>
          </div>

          <label htmlFor="taskDescription">Description</label>
          <textarea
            className="border border-gray-300 rounded p-2 focus:outline-main-light max-h-80 min-h-20"
            id="taskDescription"
            value={formData.description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
        <button className="p-1 rounded outline outline-gray-300 hover:bg-main hover:text-white">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default CreateTask;
