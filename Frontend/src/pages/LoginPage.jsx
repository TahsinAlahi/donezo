import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useForm } from "react-hook-form";
import LoginWithGoogle from "../components/LoginWithGoogle";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginWithEmail } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    const res = await loginWithEmail(data.email, data.password);
    if (res.status === "success") navigate(state?.from || "/");
  }

  return (
    <main className="bg-primary dark:bg-dark-primary min-h-screen max-w-screen-xl mx-auto text-black font-poppins py-10">
      <h1 className="text-3xl border-b-2 border-black dark:border-secondary mx-auto text-center w-fit pb-1 mb-10 font-rubik">
        Login
      </h1>
      <div className="grid grid-cols-1 w-full md:w-4/5 mx-auto place-items-center">
        <div className="w-11/12 md:w-2/5 mx-auto flex flex-col items-center justify-center">
          <form
            className="w-full space-y-4"
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="px-3 py-2 text-black outline-none rounded-md border border-gray-400 shadow-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password" className="font-semibold text-lg">
                Password
              </label>
              <div
                className="absolute right-3 bottom-3 cursor-pointer text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoMdEye className="text-xl" />
                ) : (
                  <IoMdEyeOff className="text-xl" />
                )}
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: "Password is required" })}
                className="px-3 py-2 outline-none rounded-md border text-black border-gray-400 shadow-md"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button className="w-full px-3 py-2 rounded-md bg-purple-900 text-white font-semibold hover:bg-navbar cursor-pointer transition-all duration-200 my-5">
              Login
            </button>
          </form>

          <LoginWithGoogle />

          <h3 className="mt-4 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-purple-900 hover:border-navbar border-b-2 border-transparent transition-all duration-200 font-semibold"
            >
              Register
            </Link>
          </h3>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
