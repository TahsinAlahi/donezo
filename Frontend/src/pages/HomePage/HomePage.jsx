import { Link } from "react-router-dom";
import bgImage from "../../assets/homepage-bg.jpg";

function HomePage() {
  return (
    <div
      className="w-screen h-[calc(100svh-52px)] bg-cover bg-right-bottom md:bg-left lg:bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <main className="max-w-screen-2xl h-full mx-auto flex items-center justify-center flex-col">
        <div className="text-center space-y-5">
          <h1 className="md:text-4xl text-2xl font-bold font-rubik">
            Welcome to Donezo
          </h1>
          <p className="text-lg w-11/12 mx-auto px-3 font-poppins">
            Drag, drop, and get things donezo—because productivity should be
            fun, not a chore! 🎯💡
            <br />
            Stay organized, move fast, and watch your to-do list shrink in
            style. ✅✨
          </p>
        </div>
        <div className="space-x-3 text-lg mt-7">
          <Link
            to="/login"
            className="font-semibold bg-navbar hover:text-white px-5 py-1 pb-2 rounded-lg transition duration-300 ease-in-out text-center"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="font-semibold bg-navbar hover:text-white px-5 py-1 pb-2 rounded-lg transition duration-300 ease-in-out text-center"
          >
            Sign up
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
