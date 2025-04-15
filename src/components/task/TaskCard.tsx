import { Icon } from "@iconify/react/dist/iconify.js";
import { TaskType } from "../../types/Task.type";
import { TaskPriority, TaskStatus } from "../../enum/Task.enum";
import { TaskStatusColors } from "../../config/style.config";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useState } from "react";
import { updateTask } from "../../store/TaskSlice";

type Props = {
  task: TaskType;
  handleDeleteClick: (task: TaskType) => void;
};

const TaskCard = ({ task, handleDeleteClick }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(task.status);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    dispatch(
      updateTask({
        id: task.id,
        status: newStatus,
      })
    );
    setTaskStatus(newStatus);
  };

  return (
    <div className=" flex flex-col border border-gray-300 p-4" key={task.id}>
      <h3 className="flex gap-2">
        {task.priority === TaskPriority.High && (
          <Icon
            icon="hugeicons:arrow-up-double"
            width="24"
            height="24"
            className="text-red-500"
          />
        )}
        {task.priority === TaskPriority.Low && (
          <Icon
            icon="hugeicons:arrow-down-double"
            width="24"
            height="24"
            className="text-green-500"
          />
        )}
        {task.priority === TaskPriority.Medium && (
          <Icon
            icon="tabler:minus"
            width="24"
            height="24"
            className="text-orange-400"
          />
        )}
        <span className="first-letter:uppercase">{task.title}</span>
      </h3>
      <p className="grow text-gray-500 mb-4">
        {task.description || "(No Description)"}
      </p>
      <div className="flex items-center justify-between">
        <div
          className={`rounded-full  px-2 ${
            TaskStatusColors.find((status) => status.status === task.status)
              ?.color
          }`}
        >
          <select
            className="px-2 py-0.5 focus:outline-none"
            value={taskStatus}
            onChange={handleStatusChange}
          >
            {Object.entries(TaskStatus).map(([key, value]) => (
              <option value={value} className="bg-white" key={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => handleDeleteClick(task)}
          className="flex gap-1 text-red-300 hover:text-red-600"
        >
          <Icon
            icon="solar:trash-bin-minimalistic-linear"
            width="24"
            height="24"
          />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
