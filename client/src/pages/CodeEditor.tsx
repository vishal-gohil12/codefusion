import { AppWindow, Code, Play } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { useUser } from "../userContext";
import axios from "axios";
import { BACKEND_URL } from "../backendUrl";

export default function CodeEditor() {
  const [code, setCode] = useState<string>(
    '// Write your JavaScript code here\nconsole.log("Hello, World!");'
  );
  const [output, setOutput] = useState<string>("");
  const user = useUser();

  const handleCodeChange = (value: string = "") => {
    setCode(value);
  };

  const runCode = async () => {
    if (user.projectLan === "Python") {
      try {
        console.log(code);
        const res = await axios.post(`${BACKEND_URL}/api/v1/code`, {
          code: code,
        });
        if (res.status === 200) {
          setOutput(res.data.output);
        }
      } catch (error) {
        setOutput(`Error: ${(error as Error).message}`);
      }
    } else if (user.projectLan === "javascript") {
      try {
        setOutput("");
        const originalConsoleLog = console.log;
        const outputs: string[] = [];

        console.log = (...args) => {
          outputs.push(
            args
              .map((arg) =>
                typeof arg === "object"
                  ? JSON.stringify(arg, null, 2)
                  : String(arg)
              )
              .join(" ")
          );
        };

        const executedCode = new Function(code)();

        console.log = originalConsoleLog;

        setOutput(outputs.join("\n"));

        if (executedCode !== undefined) {
          setOutput((prev) => prev + (prev ? "\n" : "") + String(executedCode));
        }
      } catch (error) {
        setOutput(`Error: ${(error as Error).message}`);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center h-20 justify-between px-8 border-b-2 bg-white">
        <div className="flex items-center gap-2">
          <AppWindow className="w-6 h-6" />
          <span className="text-xl font-semibold">Code Editor</span>
        </div>
        <div>
          <a
            href="/"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Logout
          </a>
        </div>
      </div>

      <div className="flex-1 p-4 bg-gray-50">
        <div className="grid grid-cols-2 gap-4 h-full max-w-7xl mx-auto">
          <div className="border-2 rounded-2xl bg-white shadow-sm">
            <div className="border-b-2 flex items-center gap-2 p-3 bg-gray-50 rounded-t-2xl">
              <Code className="w-5 h-5" />
              <span className="font-medium">Code</span>
              <button
                onClick={runCode}
                className="ml-auto flex items-center gap-2 bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                Run
              </button>
            </div>
            <div className="p-2 h-[calc(100%-4rem)]">
              <Editor
                height="100%"
                defaultLanguage={user.projectLan}
                language={user.projectLan.toLocaleLowerCase()}
                value={code}
                onChange={handleCodeChange}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: true,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          <div className="border-2 rounded-2xl bg-white shadow-sm">
            <div className="border-b-2 flex items-center gap-2 p-3 bg-gray-50 rounded-t-2xl">
              <span className="font-medium">Output</span>
            </div>
            <div className="p-4 font-mono text-sm h-[calc(100%-4rem)] overflow-auto whitespace-pre-wrap">
              {output || "Run your code to see the output here..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
