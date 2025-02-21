import { Link } from "react-router";

function Navbar() {
  return (
    <div className="w-screen bg-navbar/80 shadow-2sl">
      <nav className="max-w-screen-2xl mx-auto px-8 py-2 flex items-center justify-center">
        <Link className="font-roboto-condensed text-3xl" to="/">
          Donezo
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
