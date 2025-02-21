import Loader from "../../components/Loader";
import useGetTodos from "../../hooks/useGetTodos";

function TodoPage() {
  const [todos, isTodoLoading] = useGetTodos();

  if (isTodoLoading) return <Loader />;

  return <div>TodoPage</div>;
}

export default TodoPage;
