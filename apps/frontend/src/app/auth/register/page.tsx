"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { register, setAuthToken } from "@/lib/auth";

const validatePassword = (password: string) => {
  const errors = [];
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  return errors;
};

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate password before submission
    const errors = validatePassword(formData.password);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await register(formData);
      setAuthToken(response.token);
      router.push("/dashboard"); // Redirect to dashboard after registration
    } catch (err) {
      if (err instanceof Error) {
        try {
          // Try to parse the error message as JSON
          const errorData = JSON.parse(err.message);
          if (Array.isArray(errorData.errors)) {
            // Handle express-validator errors
            setError(errorData.errors.map((e: any) => e.msg).join('\n'));
          } else if (errorData.error) {
            // Handle custom error messages
            setError(errorData.error);
          } else {
            setError(err.message);
          }
        } catch {
          // If parsing fails, show the original error message
          setError(err.message);
        }
      } else {
        setError("Failed to register");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Check password requirements on change
    if (name === 'password') {
      setPasswordErrors(validatePassword(value));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700 whitespace-pre-line">
                {error}
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <Input
              label="Full Name"
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <div className="space-y-2">
              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              
              {/* Password requirements */}
              <div className="text-sm text-gray-600 space-y-1 mt-2">
                <p>Password requirements:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li className={formData.password.length >= 8 ? "text-green-600" : "text-gray-600"}>
                    At least 8 characters long
                  </li>
                  <li className={/\d/.test(formData.password) ? "text-green-600" : "text-gray-600"}>
                    Contains at least one number
                  </li>
                  <li className={/[A-Z]/.test(formData.password) ? "text-green-600" : "text-gray-600"}>
                    Contains at least one uppercase letter
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            isLoading={isLoading} 
            className="w-full"
            disabled={isLoading || passwordErrors.length > 0}
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}
