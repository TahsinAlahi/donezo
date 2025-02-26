import { createBrowserRouter } from "react-router";
import AppLayout from "./AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage/TodoPage";
import EditTask from "./components/EditTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/todo",
        element: <TodoPage />,
      },
      {
        path: "/edit/:taskId",
        element: <EditTask />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
