import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddTask = ({ setIsAddTaskOpen, refetch }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      userEmail: user?.email,
      dueDate,
    };

    const response = await axiosSecure.post("/tasks", newTask);
    if (response.data.insertedId) {
      alert("Task added successfully!");
      navigate("/dashboard");
    }

    setTitle("");
    setDescription("");
    setDueDate("");
    setIsAddTaskOpen(false);
    refetch();
  };

  return (
    <div className="w-full md:w-1/2 my-4 mx-auto bg-white p-3">
      <h2 className="text-2xl font-bold text-center mb-4">Create a Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="50"
            required
            className="w-full border-base-300 border-2 p-1 rounded mt-1"
          />
        </div>

        <div>
          <label className="block font-semibold">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            maxLength="200"
            className="w-full border-base-300 border-2 p-1 rounded mt-1"
          />
        </div>

        <div>
          <label className="block font-semibold">Task Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="100"
            className="w-full border-base-300 border-2 p-1 rounded mt-1"
          />
        </div>

        <button
          type="submit"
          className="border-2 border-black px-4 py-2 rounded-2xl"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
