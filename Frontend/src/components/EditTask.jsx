import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { user } = useAuth();
  const { taskId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosSecure.get(`/tasks/${taskId}`);
        if (response.data) {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setStatus(response.data.status);
        }
      } catch (err) {
        setError("Failed to fetch task data.");
      }
    };

    fetchTask();
  }, [taskId, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedTask = {
      title,
      description,
      status,
      userEmail: user?.email,
    };

    try {
      const response = await axiosSecure.put(`/tasks/${taskId}`, updatedTask);
      if (response.status === 200) {
        alert("Task updated successfully!");
        navigate("/dashboard");
      } else {
        setError("Failed to update task.");
      }
    } catch (err) {
      setError("An error occurred while updating the task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/2 mt-40 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Task</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="20"
            required
            className="w-full border-base-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="block font-semibold">Task Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="100"
            className="w-full border-base-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="block font-semibold">Task Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border-base-300 rounded mt-1"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button type="submit" className="btn btn-soft" disabled={loading}>
          {loading ? "Updating..." : "Update Task"}
        </button>
      </form>
    </div>
  );
};

export default EditTask;
