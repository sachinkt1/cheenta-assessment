import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "@/graphql/queries";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_TASKS);

  if (loading) return <p className="text-center mt-4">Loading tasks...</p>;
  if (error) return <p className="text-red-500 text-center">Error loading tasks</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {session ? (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Welcome, {session.user?.name}!
            </p>
            <div className="flex gap-4">
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
            <div className="flex flex-wrap flex-col justify-center items-center gap-6 card">
              {data?.getTasks.map((task: any) => (
                <div key={task.id} className="p-4 rounded-lg shadow flex flex-wrap flex-col gap-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Status: <span className="font-semibold">{task.status}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Assigned to: <span className="font-semibold">{task.assignedTo}</span>
                  </p>
                </div>
              ))}
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
