import { useState } from "react";
import axios from "axios";
import logo from "../assets/image.png";
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formObj = {
        name,
        email,
        password,
      };
      const res = await axios.post(
        "http://localhost:8080/api/v1/signup",
        formObj
      );
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        user.setUserName(name);
        navigate("/login");
      }
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="hidden md:flex md:h-screen md:w-1/2 items-center justify-center">
        <img
          src="https://png.pngtree.com/png-clipart/20200701/original/pngtree-web-development-concept-flat-design-png-image_5363510.jpg"
          alt="Web development illustration"
          className="w-full h-auto"
        />
      </div>
      <div className="h-screen w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="h-[30%] flex justify-center items-center">
          <img src={logo} width={160} alt="Logo" />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4 font-bold text-center">
          <p>Welcome to CodeFusion!</p>
          <p>Create Your Account</p>
        </div>
        <div className="mt-10">
          <form
            className="flex flex-col justify-center items-center gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-2 items-center">
              <FaRegUser size={20} />
              <input
                placeholder="Enter your Name..."
                className="outline-none border-2 p-2 w-[18em]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2 items-center">
              <MdAlternateEmail size={20} />
              <input
                placeholder="Enter your email..."
                type="email"
                className="outline-none border-2 p-2 w-[18em]"
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
                value={password}
                className="outline-none border-2 p-2 w-[18em]"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-[17em]">
              Sign Up to CodeFusion →
            </button>
            <div className="flex items-center w-[18em] my-4">
              <hr className="w-full border-gray-500" />
              <span className="mx-4">OR</span>
              <hr className="w-full border-gray-500" />
            </div>
          </form>
          <div className="flex flex-col items-center gap-4">
            <p>Already Have an Account?</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[17em]">
              <a href="/login">Log In →</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
