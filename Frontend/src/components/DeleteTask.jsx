import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";

const DeleteTask = ({ taskId }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.delete(`tasks/${taskId}`);
    },
    onSuccess: () => {
      alert("Task deleted successfully!");
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  return (
    <button
      onClick={() => deleteTaskMutation.mutate()}
      className="text-base cursor-pointer text-red-500"
    >
      <FaTrash />
    </button>
  );
};

export default DeleteTask;
