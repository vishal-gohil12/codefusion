import { Code2, Cpu, Users, Globe2, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Multi-Language Support",
    description:
      "Write and run JavaScript and Python code with full syntax highlighting and autocompletion.",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Code together with your team in real-time with live editing and chat.",
  },
  {
    icon: Cpu,
    title: "Powerful Runtime",
    description:
      "Execute code in secure, isolated environments with support for npm packages and pip modules.",
  },
  {
    icon: Globe2,
    title: "Accessible Anywhere",
    description:
      "Access your projects from any device with a web browser. No installation needed.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description:
      "Start coding immediately with pre-configured development environments.",
  },
  {
    icon: Lock,
    title: "Secure by Default",
    description:
      "Enterprise-grade security with encrypted storage and secure execution environments.",
  },
];

export default function Features() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Powerful Features
          </h2>
          <p className="mt-4 text-gray-600">
            Everything you need to code efficiently
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Icon className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
