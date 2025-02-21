import { createBrowserRouter } from "react-router";
import AppLayout from "./AppLayout";
import TodoPage from "./pages/TodoPage/TodoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <TodoPage />,
      },
    ],
  },
]);

export default router;
