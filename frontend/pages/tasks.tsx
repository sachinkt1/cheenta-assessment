import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import io from "socket.io-client";
import TaskForm from "@/components/TaskForm";

const GET_TASKS = gql`
  query GetTasks {
    getTasks {
      id
      title
      description
      status
      assignedTo
      createdAt
    }
  }
`;

export default function Tasks() {
  const { data, loading, error, refetch } = useQuery(GET_TASKS);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (data) {
      setTasks(data.getTasks);
    }
  }, [data]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL!);
    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    });
    return () => socket.disconnect();
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error fetching tasks</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Task Management</h1>
      <TaskForm onTaskAdded={refetch} />
      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task?.id} className="p-2 border-b">
            <strong>{task?.title}</strong> - {task?.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
