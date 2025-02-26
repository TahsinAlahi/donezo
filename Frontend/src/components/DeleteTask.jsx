import { useMutation, useQueryClient } from "react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DeleteTask = ({ taskId }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      alert("Task deleted successfully!");
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  return (
    <button
      onClick={() => deleteTaskMutation.mutate()}
      className="btn btn-sm btn-error"
    >
      Delete
    </button>
  );
};

export default DeleteTask;
