export function CodePreview() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="p-4 text-sm font-mono">
          <pre className="text-green-400">
            <code className="text-purple-300">
              {`function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

// Example usage
const numTerms = 10;
console.log("Fibonacci sequence with terms:", fibonacci(numTerms));
      `}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
