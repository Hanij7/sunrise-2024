

import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
  tasks = [...initialTasks];
}

export function getActiveTasks(): Task[] {
  return tasks.filter(task => !task.completed);
}

export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function completeTask(taskTitle: string): void {
  tasks = tasks.map(task => 
    task.title === taskTitle ? { ...task, completed: true } : task
  );
}

export function createTask(title: string, description: string, persona: string, group: number): void {
  const newTask: Task = {
    id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
    title,
    description,
    persona,
    group,
    completed: false
  };
  tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
  tasks = tasks.map(task => 
    task.id === taskId ? { ...task, ...updatedTask } : task
  );
}

export function deleteTask(taskId: number): void {
  tasks = tasks.filter(task => task.id !== taskId);
}
