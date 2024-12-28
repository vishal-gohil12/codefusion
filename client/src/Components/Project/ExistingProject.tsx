import axios from "axios";
import { Code2, Folder, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../backendUrl";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../userContext";

interface Projects {
  id: number;
  projectName: string;
  projectLanguage: string;
  useId: number;
}

export default function ExistingProject({
  setShowProject,
}: {
  setShowProject: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    async function fetchProject() {
      try {
        setIsLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/v1/getProject`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        if (res.data) {
          setProjects(res.data.projects);
        }
      } catch (error) {
        alert("Failed to fetch projects. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProject();
  }, []);

  const handleProject = (projectName: string, projectLanguage: string) => {
    user.setProjectsLan(projectLanguage);
    navigate(`/project/${projectName}`);
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "bg-yellow-100 text-yellow-800",
      TypeScript: "bg-blue-100 text-blue-800",
      Python: "bg-green-100 text-green-800",
      default: "bg-gray-100 text-gray-800",
    };
    return colors[language] || colors.default;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl">
        <div className="p-6 relative">
          <button
            className="absolute right-6 top-6 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setShowProject(false)}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Folder className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Your Projects
              </h2>
            </div>
            <p className="text-gray-600">
              Manage and access your created projects
            </p>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-8">
              <Code2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No projects found</p>
              <p className="text-sm text-gray-500">
                Create your first project to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {project.projectName}
                      </h3>
                      <span
                        className={`inline-block px-2.5 py-0.5 mt-2 text-xs font-medium rounded-full ${getLanguageColor(
                          project.projectLanguage
                        )}`}
                      >
                        {project.projectLanguage}
                      </span>
                    </div>
                    <button
                      className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() =>
                        handleProject(
                          project.projectName,
                          project.projectLanguage
                        )
                      }
                    >
                      <Code2 className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    Project ID: {project.id}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
