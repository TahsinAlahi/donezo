import { Outlet, useLocation, useNavigate } from "react-router";
import { ToastContainer, Bounce } from "react-toastify";
import Navbar from "./components/Navbar";
import { useAuth } from "./providers/AuthProvider";
import { useEffect } from "react";

function AppLayout() {
  const { user, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthLoading && user && location.pathname === "/") {
      navigate("/todo");
    }
  }, [user, isAuthLoading, location.pathname, navigate]);
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default AppLayout;
