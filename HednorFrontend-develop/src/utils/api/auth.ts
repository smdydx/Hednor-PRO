// services/auth.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://434e70d0-457f-4616-859c-e1cdf4b61136-00-bb1au6v4t9iy.sisko.replit.dev:3000";


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
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
      username: name,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Signup failed:", error?.response?.data || error.message);
    throw error;
  }
};
