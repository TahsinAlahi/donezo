import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../providers/AuthProvider";

function LoginWithGoogle() {
  const { loginWithGoogle } = useAuth();

  function handleLoginWithGoogle() {
    loginWithGoogle();
  }

  return (
    <div
      className="w-full flex items-center justify-center py-2 rounded-lg bg-orange-600 cursor-pointer font-semibold text-white hover:bg-orange-700 duration-100 transition text-md"
      onClick={handleLoginWithGoogle}
    >
      <FaGoogle className="w-8 aspect-square mr-2" />
      Login With Google
    </div>
  );
}

export default LoginWithGoogle;
