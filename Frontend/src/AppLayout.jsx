import { Outlet } from "react-router";
import { ToastContainer, Bounce } from "react-toastify";
import Navbar from "./components/Navbar";

function AppLayout() {
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
