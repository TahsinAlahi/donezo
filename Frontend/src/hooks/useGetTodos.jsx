import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

function useGetTodos() {
  const [todos, setTodos] = useState([]);
  const [isTodoLoading, setIsTodoLoading] = useState(true);

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await useAxiosSecure("/tasks");
        if (response.status === 200) {
          setTodos(response.data);
        }
      } catch (error) {
        toast(error.message);
      } finally {
        setIsTodoLoading(false);
      }
    }

    getTodos();
  }, []);

  return [todos, isTodoLoading];
}

export default useGetTodos;
