import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext";
import { BACKEND_URL } from "../backendUrl";

export default function ProjectModal({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [projectName, setProjectName] = useState("");
  const [projectLanguage, setLanguage] = useState("");
  const navigate = useNavigate();
  const user = useUser();

  const handleProkectCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formObj = { projectName, projectLanguage };
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/projectCreate`,
        formObj,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.data.status === "success") {
        setShow(false);
        user.setProjectsLan(projectLanguage);
        navigate(`/project/${projectName}`);
      }
    } catch (e) {
      alert("Error Occurred: " + e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl">
        <div className="p-6 relative">
          <button
            onClick={() => setShow(false)}
            className="absolute right-6 top-6 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Create Project
            </h2>
          </div>
          <form className="space-y-6" onSubmit={handleProkectCreation}>
            <div className="space-y-2">
              <label
                htmlFor="projectName"
                className="block text-sm font-medium text-gray-700"
              >
                Project Name
              </label>
              <input
                id="projectName"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700"
              >
                Programming Language
              </label>
              <input
                id="language"
                type="text"
                value={projectLanguage}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="e.g., JavaScript, Python"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Create Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
