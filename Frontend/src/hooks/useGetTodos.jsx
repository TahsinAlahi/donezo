import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

function useGetTodos() {
  const [todos, setTodos] = useState([]);
  const [isTodoLoading, setIsTodoLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [ordered, setOrdered] = useState();

  async function getTodos() {
    try {
      const response = await axiosSecure("/tasks");
      if (response.status === 200) {
        const sortedTodos = response.data.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        setTodos(sortedTodos);
      }
    } catch (error) {
      toast(error.message);
    } finally {
      setIsTodoLoading(false);
    }
  }

  useEffect(() => {
    getTodos();
  }, [axiosSecure]);

  return {
    todos,
    setTodos,
    isTodoLoading,
    ordered,
    setOrdered,
    refetchTodos: getTodos,
  };
}

export default useGetTodos;
