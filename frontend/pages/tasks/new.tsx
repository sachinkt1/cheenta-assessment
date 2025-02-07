import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { ADD_TASK } from "@/graphql/mutations";
import { GET_TASKS } from "@/graphql/queries";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export default function NewTask() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [createTask, { loading, error }] = useMutation(ADD_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !assignedTo) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields before submitting.",
      });
      return;
    }

    try {
      await createTask({
        variables: { title, description, status: "pending", assignedTo },
      });

      Swal.fire({
        icon: "success",
        title: "Task Created",
        text: "Your task has been successfully created!",
      }).then(() => router.push("/"));
      
    } catch (err: any) {
        console.log(err);
        
      Swal.fire({
        icon: "error",
        title: "Error Creating Task",
        text: err.message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-center dark:text-white mb-4">
          Create New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col mt-4 gap-4">
          <Input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Assign to (User Email)"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Task"}
          </Button>
        </form>
      </div>
    </div>
  );
}
