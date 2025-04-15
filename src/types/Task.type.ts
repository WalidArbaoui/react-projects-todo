import { TaskPriority, TaskStatus } from "../enum/Task.enum";

export interface TaskType {
  id?: number;
  projectId?: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority?: TaskPriority;
  createdAt?: string;
}
