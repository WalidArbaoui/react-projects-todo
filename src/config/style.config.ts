import { TaskStatus } from "../enum/Task.enum";

export const TaskStatusColors = [
  {
    status: TaskStatus.Completed,
    color: "bg-green-200",
  },
  {
    status: TaskStatus["In Progress"],
    color: "bg-orange-200",
  },
  {
    status: TaskStatus.ToDo,
    color: "bg-blue-200",
  },
];

export interface DashboardCardsType {
  title: TaskStatus;
  value: number;
  unit?: string;
  icon: string;
  iconColor?: string;
}

export const DashboardCards: DashboardCardsType[] = [
  {
    title: TaskStatus.ToDo,
    value: 0,
    unit: "Task",
    icon: "hugeicons:sticky-note-01",
    iconColor: "lightblue",
  },
  {
    title: TaskStatus["In Progress"],
    value: 0,
    unit: "Task",
    icon: "fluent-mdl2:hour-glass",
    iconColor: "orange",
  },
  {
    title: TaskStatus.Completed,
    value: 0,
    unit: "Task",
    icon: "nrk:media-media-complete",
    iconColor: "green",
  },
];
