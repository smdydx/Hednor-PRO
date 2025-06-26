// services/auth.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://4ce7a542-f80d-465a-ad2f-19dad5b19695-00-3657na841g50s.sisko.replit.dev:4000";


if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined in your environment variables.");
}

export const loginAuth = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};

export const signupAuth = async ({ name, email, password }: { name: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, {
      firstName: name,
      lastName: "",
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Signup failed:", error?.response?.data || error.message);
    throw error;
  }
};
