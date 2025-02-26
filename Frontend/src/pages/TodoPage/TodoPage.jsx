import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaMinus } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import AddTask from "../../components/AddTask";
import DeleteTask from "../../components/DeleteTask";

function TodoPage() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // Fetch tasks using React Query
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axiosSecure.get("tasks");
      return response.data;
    },
  });

  // State for task columns
  const [columns, setColumns] = useState({
    "To-Do": [],
    "In Process": [],
    Done: [],
  });

  // Sync columns when tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      setColumns({
        "To-Do": tasks.filter((task) => task.category === "To-Do"),
        "In Process": tasks.filter((task) => task.category === "In Process"),
        Done: tasks.filter((task) => task.category === "Done"),
      });
    }
  }, [tasks]);

  // Mutation to update task status
  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask) => {
      await axiosSecure.put(`/tasks/${updatedTask._id}`, {
        category: updatedTask.category,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // Refresh task list
    },
  });

  // Handle drag end
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCategory = source.droppableId;
    const destinationCategory = destination.droppableId;

    // Copy current state
    const newColumns = { ...columns };

    // Remove task from source
    const [movedTask] = newColumns[sourceCategory].splice(source.index, 1);
    movedTask.category = destinationCategory;

    // Add to new destination
    newColumns[destinationCategory].splice(destination.index, 0, movedTask);

    // Update state
    setColumns(newColumns);

    // Update backend if category changed
    if (sourceCategory !== destinationCategory) {
      updateTaskMutation.mutate(movedTask);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-screen-2xl mx-auto min-h-[calc(100svh-52px)] pt-9 relative">
      <div
        className="absolute bottom-7 p-2 bg-red-500 rounded-full right-7 z-100"
        onClick={() => setIsAddTaskOpen(!isAddTaskOpen)}
      >
        {isAddTaskOpen ? (
          <FaMinus className="text-white" />
        ) : (
          <FaPlus className="text-white" />
        )}
      </div>

      {/* Add Task Button */}
      <div
        className={`flex items-center justify-center absolute inset-0 bg-slate-200 ${
          isAddTaskOpen ? "block" : "hidden bg-red-500"
        } transition-all duration-300`}
      >
        <div
          className={`${isAddTaskOpen ? "opacity-100" : "opacity-0"} w-full`}
        >
          <AddTask setIsAddTaskOpen={setIsAddTaskOpen} />
        </div>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([category, tasks]) => (
            <Droppable droppableId={category} key={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="border-2 border-black p-3 min-h-[300px]"
                >
                  <h2 className="text-xl font-bold mb-2 flex justify-between items-center">
                    {category}
                  </h2>
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border p-3 bg-white shadow-md rounded-md mb-2 flex justify-between items-center"
                        >
                          <div>{task.description}</div>
                          <div className="flex gap-2">
                            {/* Edit Task */}
                            <Link to={`/edit/${task._id}`}>
                              <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
                            </Link>

                            {/* Delete Task */}
                            <DeleteTask taskId={task._id} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default TodoPage;
