import TaskCard from "./TaskCard";
import { TaskType } from "../../types/Task.type";
import { useState } from "react";
import SimpleModal from "../layout/SimpleModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { deleteTask } from "../../store/TaskSlice";
type Props = {
  tasks: TaskType[];
};

const TasksList = ({ tasks }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [modal, setModal] = useState(false);
  const [task, setTask] = useState<TaskType | undefined>(undefined);

  const handleDeleteClick = (task: TaskType) => {
    setModal(true);
    setTask(task);
  };

  const handleDeleteAction = () => {
    if (task && task.id) {
      dispatch(deleteTask(task.id));
      setModal(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          handleDeleteClick={handleDeleteClick}
        />
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
            <p>Are you sure you want to delete "{task?.title}" task?</p>
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

export default TasksList;
