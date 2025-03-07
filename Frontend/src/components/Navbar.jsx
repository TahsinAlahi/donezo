import { Link, useNavigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="w-screen bg-navbar/80 shadow-2sl">
      <nav className="max-w-screen-2xl mx-auto px-8 py-2 flex items-center justify-center relative">
        <Link
          className="font-roboto-condensed text-3xl"
          to={user ? "/todo" : "/"}
        >
          Donezo
        </Link>
        {user && (
          <button
            className="absolute text- right-8 px-3 text-black border-b-2 border-transparent hover:border-black z-10 cursor-pointer font-poppins"
            onClick={async () => {
              await logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
