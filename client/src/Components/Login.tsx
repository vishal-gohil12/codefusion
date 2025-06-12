import { useState } from "react";
import logo from "../assets/image.png";
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../userContext";
import { BACKEND_URL } from "../backendUrl";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const uesr = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formObj = {
        email,
        password,
      };
      const res = await axios.post(`${BACKEND_URL}/api/v1/login`, formObj);
      if (res.data.status) {
        uesr.setUserName(res.data.userName);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="h-screen w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="h-[30%] flex justify-center items-center">
          <img src={logo} width={160} alt="Logo" />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4 font-bold text-center">
          <p>Welcome back!</p>
          <p>Please log in to your account</p>
        </div>
        <div className="mt-10">
          <form
            className="flex flex-col justify-center items-center gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-2 items-center">
              <MdAlternateEmail size={20} />
              <input
                placeholder="Enter your email..."
                className="outline-none border-2 p-2 w-[18em]"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2 items-center">
              <TbLockPassword size={20} />
              <input
                placeholder="Enter your password..."
                type="password"
                className="outline-none border-2 p-2 w-[18em]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-[17em]">
              Login to CodeFusion →
            </button>
            <div className="flex items-center w-[18em] my-4">
              <hr className="w-full border-gray-500" />
              <span className="mx-4">OR</span>
              <hr className="w-full border-gray-500" />
            </div>
          </form>
          <div className="flex flex-col items-center gap-4">
            <p>Don't have an account?</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[17em]">
              <Link to={"/signup"}>Sign Up →</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:h-screen md:w-1/2 items-center justify-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/004/491/062/non_2x/programmer-working-concept-for-web-banner-man-work-with-code-and-programming-at-computer-creates-software-modern-person-scene-illustration-in-flat-cartoon-design-with-people-characters-vector.jpg"
          alt="Programming illustration"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
