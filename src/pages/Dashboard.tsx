import { useDispatch, useSelector } from "react-redux";
import StatisticsCard from "../components/dashboard/StatisticsCard";
import ProjectsList from "../components/project/ProjectsList";
import {
  getAllTasks,
  getTasksIsLoading,
  getTasksError,
  fetchTasks,
} from "../store/TaskSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../store";
import { TaskStatus } from "../enum/Task.enum";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DashboardCards, DashboardCardsType } from "../config/style.config";
import { ensure } from "../helper/typescript.helper";
import { fetchProjects, getAllProjects } from "../store/ProjectSlice";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(getAllTasks);
  const tasksError = useSelector(getTasksError);
  const tasksIsLoading = useSelector(getTasksIsLoading);
  const [cardsValues, useCardsValues] =
    useState<DashboardCardsType[]>(DashboardCards);

  const projects = useSelector(getAllProjects);

  useEffect(() => {
    dispatch(fetchTasks(null));
    if (projects.length <= 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch]);

  useEffect(() => {
    if (tasks) {
      const newCardValues = DashboardCards.map((card) => ({
        ...card,
        value: tasks.filter((task) => task.status === card.title).length,
      }));

      useCardsValues(newCardValues);
    }
  }, [tasks]);

  return (
    <>
      <h1 className="font-bold text-2xl mb-2">Dashboard</h1>
      <section className="mb-4">
        <div className="flex gap-6">
          <div className="flex items-center gap-2 py-4 px-2 border-l-2 border-main ">
            <div>
              <span className="font-bold text-4xl mr-2">{tasks.length}</span>
            </div>
            <div>
              <h3 className="flex items-baseline gap-1 text-xl font-bold">
                <Icon
                  icon="hugeicons:sticky-note-02"
                  width="16"
                  height="16"
                  className="text-main"
                />
                Total
              </h3>
              <span className="text-gray-400 text-sm">
                {`Task${tasks.length !== 1 ? "s" : ""}`}
              </span>
            </div>
          </div>
          {cardsValues.map((card) => (
            <StatisticsCard
              key={card.title}
              title={card.title}
              value={card.value}
              unit={card.unit}
              icon={card.icon}
              iconColor={card.iconColor}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-1">&mdash; List of projects</h3>
        <ProjectsList projects={projects} />
      </section>
    </>
  );
};

export default Dashboard;
