"use client";

import { useState } from "react";

export default function TestPage() {
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [dbResponse, setDbResponse] = useState<string>("");
  const [dbError, setDbError] = useState<string>("");
  const [dbLoading, setDbLoading] = useState(false);

  const backendUrl = process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const fetchWithCORS = async (endpoint: string) => {
    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "omit",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const testBackend = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("Attempting to fetch from:", backendUrl);
      const data = await fetchWithCORS("/api");
      console.log("Response data:", data);
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Fetch error details:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const testDatabase = async () => {
    setDbLoading(true);
    setDbError("");
    try {
      console.log("Testing database connection...");
      const data = await fetchWithCORS("/api/db-test");
      console.log("Database test response:", data);
      setDbResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Database test error:", err);
      setDbError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setDbLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Backend API Test</h1>

        <div className="mb-4">
          <p className="text-gray-600">Backend URL: {backendUrl}</p>
          <p className="text-sm text-gray-500 mt-1">
            Environment: {process.env.NODE_ENV}
          </p>
        </div>

        <div className="space-x-4">
          <button
            onClick={testBackend}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Backend Connection"}
          </button>

          <button
            onClick={testDatabase}
            disabled={dbLoading}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
          >
            {dbLoading ? "Testing DB..." : "Test Database Connection"}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 dark:bg-red-900 dark:border-red-800 dark:text-red-200 rounded">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {response && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              Backend Response:
            </h2>
            <pre className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 p-4 rounded overflow-auto">
              {response}
            </pre>
          </div>
        )}

        {dbError && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 dark:bg-red-900 dark:border-red-800 dark:text-red-200 rounded">
            <p className="font-semibold">Database Error:</p>
            <p>{dbError}</p>
          </div>
        )}

        {dbResponse && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              Database Test Response:
            </h2>
            <pre className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 p-4 rounded overflow-auto">
              {dbResponse}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
