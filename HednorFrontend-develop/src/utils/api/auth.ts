// services/auth.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:4000` : 'http://localhost:4000');


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
  // Split name into firstName and lastName
  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  console.log('API Request details:');
  console.log('URL:', `${BASE_URL}/api/auth/register`);
  console.log('Payload:', { firstName, lastName, email, password: '***' });

  try {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, {
      firstName,
      lastName,
      email,
      password,
    }, {
      timeout: 30000, // 30 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Signup failed:", error?.response?.data || error.message);
    throw error;
  }
};