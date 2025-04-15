import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  getAllTasks,
  getTasksIsLoading,
  getTasksError,
} from "../store/TaskSlice";
import { useEffect } from "react";
import { AppDispatch } from "../store";
import TasksList from "../components/task/TasksList";

const Tasks = () => {
  const location = useLocation();
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(getAllTasks);
  const isLoading = useSelector(getTasksIsLoading);
  const error = useSelector(getTasksError);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchTasks(params.id));
    }
  }, []);

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
      <section className="grow-1">
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
        {!isLoading && !error && <TasksList tasks={tasks} />}
      </section>
      <Outlet />
    </>
  );
};

export default Tasks;
