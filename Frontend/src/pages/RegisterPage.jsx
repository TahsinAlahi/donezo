import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import passwordValidator from "../utils/passwordValidator";
import LoginWithGoogle from "../components/LoginWithGoogle";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  async function handleRegister(data) {
    if (!passwordValidator(data.password)) {
      toast.error("Try a stronger password!");
      return;
    }

    const res = await registerWithEmail(
      data.displayName,
      data.email,
      data.password
    );

    if (res.status === "success") navigate(state?.from || "/todo");
  }

  return (
    <main className="bg-primary dark:bg-dark-primary min-h-screen max-w-screen-xl mx-auto text-black font-poppins py-10">
      <h1 className="text-3xl border-b-2 border-black dark:border-secondary mx-auto text-center w-fit pb-1 mb-10 font-rubik">
        Register
      </h1>

      <div className="w-11/12 md:w-2/5 mx-auto flex flex-col items-center justify-center">
        <form
          className="w-full space-y-4"
          onSubmit={handleSubmit(handleRegister)}
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
          <div className="flex flex-col gap-1">
            <label htmlFor="displayName" className="font-semibold text-lg">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              {...register("displayName", {
                required: "Display name is required",
              })}
              className="px-3 py-2 text-black outline-none rounded-md border border-gray-400 shadow-md"
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm">
                {errors.displayName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="font-semibold text-lg">
              Password
            </label>
            <div
              className="absolute right-3 bottom-3 text-black cursor-pointer"
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
              className="px-3 py-2 text-black outline-none rounded-md border border-gray-400 shadow-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button className="w-full px-3 py-2 rounded-md bg-purple-900 text-white font-semibold hover:bg-navbar cursor-pointer transition-all duration-200 my-5">
            Register
          </button>
        </form>

        <LoginWithGoogle />

        <h3 className="mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-900 hover:border-navbar border-b-2 border-transparent transition-all duration-200 font-semibold"
          >
            Login
          </Link>
        </h3>
      </div>
    </main>
  );
}

export default RegisterPage;
