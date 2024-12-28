import { useState } from "react";
import ProjectModel from "../pages/Project";
import ExistingProject from "./Project/ExistingProject";
import { useUser } from "../userContext";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [show, setShow] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const navigate = useNavigate();
  const user = useUser();

  const handleButtonClick = () => {
    if (!user.userName) {
      navigate("/login");
    }
  };

  return (
    <div className="mt-20">
      <div className="flex flex-col justify-center items-center gap-8 px-10 md:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
          Code Anywhere, <span className="text-indigo-600">Together</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-center">
          A powerful online IDE supporting JavaScript and Python. Write, run,
          and collaborate on code in real-time.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
            onClick={() => {
              handleButtonClick();
              setShowProject(true);
            }}
          >
            Get Started
          </button>
          <button
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => {
              handleButtonClick();
              setShow(!show);
            }}
          >
            Create Project
          </button>
        </div>
      </div>
      {show && user.userName && <ProjectModel setShow={setShow} />}
      {showProject && user.userName && (
        <ExistingProject setShowProject={setShowProject} />
      )}
    </div>
  );
}
