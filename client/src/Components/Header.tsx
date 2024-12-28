import logo from "../assets/image.png";
import { useUser } from "../userContext";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useUser();
  return (
    <nav className="p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="text-white text-lg font-bold">
          <img src={logo} width={160} className="p-2" />
        </div>
        <button
          className="block lg:hidden px-2 text-white focus:outline-none"
          onClick={() => {
            const menu = document.getElementById("menu");
            if (menu) {
              menu.classList.toggle("hidden");
            }
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <ul
          id="menu"
          className="hidden lg:flex flex-col lg:flex-row lg:space-x-4 w-full lg:w-auto"
        >
          <li>
            <Link to="/" className="relative group block lg:inline-block">
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link to="#" className="relative group block lg:inline-block">
              About
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link to="#" className="relative group block lg:inline-block">
              Services
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link to="#" className="relative group block lg:inline-block">
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
          </li>
        </ul>
        <div className="mt-4 lg:mt-0">
          {user.userName ? (
            <a className="border-b-2 border-black rounded">{user.userName}</a>
          ) : (
            <a href="/login" className="bg-black text-white px-4 py-2 rounded">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
