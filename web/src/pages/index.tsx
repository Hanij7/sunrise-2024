import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import { initialTasks } from "@/utils/TaskList"; // Import the tasks
import { TiTick } from "react-icons/ti";

export default function Home() {
  // State to hold tasks
  const [tasks, setTasks] = useState(initialTasks);

  // Function to filter tasks by their group and completion status
  const filterTasks = (groups, completed) => {
    return tasks.filter(task => groups.includes(task.group) && task.completed === completed);
  };

  // Define group ranges for each section
  const inProgressGroups = [1,2];
  const toDoGroups = [3, 4, 5, 6, 7, 8, 9, 10];

  // Handle the click event for the "Done" button
  const handleDoneClick = (taskId) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      );
      // Move the first task from To-Do to In Progress
      const toDoTasks = updatedTasks.filter(task => toDoGroups.includes(task.group) && !task.completed);
      if (toDoTasks.length > 0) {
        const firstToDoTask = toDoTasks[0];
        const updatedToDoTask = { ...firstToDoTask, group: 1 };
        return updatedTasks.map(task => 
          task.id === firstToDoTask.id ? updatedToDoTask : task
        );
      }
      return updatedTasks;
    });
  };

  return (
    <>
      <Head>
        <title>Task Board</title>
        <meta name="description" content="Task Board Documentation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Task Board</h1>
        </header>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              To-Do <span className={styles.taskCounttodo}>{filterTasks(toDoGroups, false).length}</span>
            </h2>
            {filterTasks(toDoGroups, false).map(task => (
              <div className={styles.card} key={task.id}>
                <div className={styles.cardHeader}>
                  <span>Task {task.id}: {task.title}</span>
                  <button className={styles.doneButtonin}><TiTick className={styles.tick} /> Done</button>
                </div>
                <p className={styles.cardDescription}>{task.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              In Progress <span className={styles.taskCountinpr}>{filterTasks(inProgressGroups, false).length}</span>
            </h2>
            {filterTasks(inProgressGroups, false).map(task => (
              <div className={styles.card} key={task.id}>
                <div className={styles.cardHeader}>
                  <span>Task {task.id}: {task.title}</span>
                  <button className={styles.doneButton} onClick={() => handleDoneClick(task.id)}><TiTick className={styles.tick} /> Done</button>
                </div>
                <p className={styles.cardDescription}>{task.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Completed <span className={styles.taskCountcmpt}>{filterTasks(inProgressGroups, true).length}</span>
            </h2>
            {filterTasks(inProgressGroups, true).map(task => (
              <div className={styles.card} key={task.id}>
                <div className={styles.cardHeader}>
                  <span>Task {task.id}: {task.title}</span>
                  <button className={styles.doneButton} disabled>Done</button>
                </div>
                <p className={styles.cardDescription}>{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}