import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { GET_TASKS } from "@/graphql/queries";
import { UPDATE_TASK_STATUS } from "@/graphql/mutations";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(GET_TASKS);
  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS);
  const [socket, setSocket] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const newSocket = io("http://localhost:5003");
    setSocket(newSocket);
    newSocket.on("taskUpdated", (updatedTask: any) => {
      Swal.fire({
        icon: "info",
        title: "Task Updated",
        text: `Task "${updatedTask.title}" is now ${updatedTask.status}`,
      });
      refetch();
    });
    return () => newSocket.disconnect();
  }, [refetch]);

  const handleUpdateStatus = async (taskId: string, currentStatus: string) => {
    const { value: newStatus } = await Swal.fire({
      title: "Update Task Status",
      input: "select",
      inputOptions: {
        pending: "Pending",
        inProgress: "In Progress",
        completed: "Completed",
      },
      inputValue: currentStatus,
      showCancelButton: true,
    });

    if (!newStatus) return;

    try {
      await updateTaskStatus({
        variables: { id: taskId, status: newStatus },
      });
      socket.emit("taskUpdated", { id: taskId, status: newStatus });
      Swal.fire("Updated!", "Task status has been updated.", "success");
    } catch (err: any) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading tasks...</p>;
  if (error) return <p className="text-red-500 text-center">Error loading tasks</p>;

  const filteredTasks = data?.getTasks.filter((task: any) =>
    statusFilter === "all" ? true : task.status === statusFilter
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {session ? (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Welcome, {session.user?.name}!
            </p>
            <div className="flex gap-4">
              <select
                className="p-2 border rounded"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={() => router.push("/tasks/new")}
                className="p-2 bg-green-500 rounded"
              >
                Create New Task
              </button>
              <button onClick={() => signOut()} className="p-2 bg-red-500 rounded">
                Logout
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-wrap flex-col justify-center items-center gap-6">
              {
                filteredTasks.length > 0 ? filteredTasks.map((task: any) => (
                <div key={task.id} className="flex flex-col rounded-lg shadow w-full max-w-md gap-2 card">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
                  <p className="text-sm text-gray-500 mt-2 flex items-center justify-between">
                    Status: <span className="font-semibold">{task.status === 'inProgress' ? 'In Progress' : task.status}</span>
                    <button onClick={() => handleUpdateStatus(task.id, task.status)}>
                      <img className="ml-2 cursor-pointer" src="/icons8-edit-24.png" alt="Edit" />
                    </button>
                  </p>
                  <p className="text-sm text-gray-500">
                    Assigned to: <span className="font-semibold">{task.assignedTo}</span>
                  </p>
                </div>
                )) : (
                  <div className="card">
                      <img className="edit-icon" src="/icons8-no-data-availible-50.png" alt="" />
                      <span className="ml-8">No result found :)</span>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl">Welcome To,</h2>
          <p className="text-lg pt-2">Task Management System</p>
          <button onClick={() => signIn("google")} className="p-2 bg-blue-500 text-white rounded mt-4">
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
}
