interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.NEXT_PUBLIC_API_URL
  : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to login");
  }

  return response.json();
}

export async function register(
  credentials: RegisterCredentials
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to register");
  }

  return response.json();
}

export async function requestPasswordReset(email: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to request password reset");
  }
}

export function setAuthToken(token: string): void {
  localStorage.setItem("authToken", token);
}

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
}

export function removeAuthToken(): void {
  localStorage.removeItem("authToken");
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
