import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  getAllTasks,
  getTasksIsLoading,
  getTasksError,
  getFilteredAndSearchedTasks,
} from "../store/TaskSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../store";
import TasksList from "../components/task/TasksList";
import { TaskStatus } from "../enum/Task.enum";

const Tasks = () => {
  const location = useLocation();
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(getTasksIsLoading);
  const error = useSelector(getTasksError);

  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch tasks from Redux state
  const tasks = useSelector((state) =>
    getFilteredAndSearchedTasks(state, statusFilter, searchQuery)
  );

  useEffect(() => {
    if (params.id) {
      dispatch(fetchTasks(params.id));
    }
  }, [params.id]);

  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-2xl mb-2">Tasks</h1>
        <Link
          to={`/projects/${params.id}/add`}
          state={{ background: location }}
          className="flex items-center gap-1 py-1 pl-2 pr-4 rounded-full outline outline-gray-300 hover:bg-main hover:text-white hover:outline-none"
        >
          <Icon icon="proicons:note-add" width="24" height="24" />
          Create Task
        </Link>
      </div>
      <section className="grow-1 mt-4">
        <div className="flex items-center py-1 px-2 border border-gray-300 rounded-full justify-between">
          <div className="flex items-center gap-2 w-full">
            <Icon icon="charm:search" width="16" height="16" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="filter">Status</label>
            <select
              id="filter"
              className="underline cursor-pointer"
              value={statusFilter || ""}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="" className="dark:text-light">
                All
              </option>
              {Object.entries(TaskStatus).map(([key, value]) => (
                <option value={value} key={key} className="dark:text-light">
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full">
            <Icon
              icon="eos-icons:loading"
              width="58"
              height="58"
              className="text-main"
            />
            <span>Loading...</span>
          </div>
        )}
        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center h-full">
            <Icon
              icon="tdesign:error-triangle"
              width="48"
              height="48"
              className="text-red-500"
            />
            <span className="text-lg">Error: {error}</span>
          </div>
        )}
        {!isLoading && !error && !tasks.length && (
          <div className="flex flex-col items-center justify-center h-full text-gray-300">
            <Icon icon="system-uicons:box-open" width="64" height="64" />
            <p className="text-xl">No Tasks found.</p>
          </div>
        )}
        {!isLoading && !error && <TasksList tasks={tasks} />}
      </section>
      <Outlet />
    </>
  );
};

export default Tasks;
