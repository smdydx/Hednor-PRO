"use client";
import React, { useEffect, useState } from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { signupAuth } from "@/utils/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { tokenStore } from "@/state/slice/authSlice";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";

const PageSignUp = () => {
  const router = useRouter()
  const token = useSelector((state: any) => state.auth.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isCheckingToken, setIsCheckingToken] = useState<boolean>(true);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const mutation = useMutation({
    mutationFn: signupAuth,
    onSuccess: (data) => {
      console.log('Signup successful:', data);
      dispatch(tokenStore({ token: data.access_token }));
      alert("Signup successful!");
      setLoading(false);
      router.push("/");
    },
    onError: (error: any) => {
      console.error('Signup failed:', error);
      alert(`Signup failed: ${error?.response?.data?.message || error.message}`);
      setLoading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    
    console.log('Submitting signup with:', { name, email, password: '***' });
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL || "http://0.0.0.0:4000/api");
    setLoading(true);
    mutation.mutate({
      name: name.trim(),
      email: email.trim(),
      password: password,
    });
  };

  useEffect(() => {
    if (token) {
      router.push("/");
    } else {
      setIsCheckingToken(false);
    }
  }, [router, token]);

  if (isCheckingToken) {
    return <div><Loader /></div>;
  }

  return (
    <div className={`nc-PageSignUp`} data-nc-id="PageSignUp">
      <div className="container max-w-md p-10 my-10 lg:my-10 rounded-3xl sm:border-2 sm:border-primary-500">
        <h2 className="mb-8 flex items-center text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">Name</span>
              <Input
                type="text"
                placeholder="Name"
                className="mt-1"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">Email</span>
              <Input
                type="email"
                placeholder="Email Id"
                className="mt-1"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="block relative">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-10 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </label>

            <label className="block relative">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="mt-1"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-10 text-gray-500"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>

              {password !== confirmPassword && confirmPassword && (
                <p className="text-red-500 text-sm mt-1">Password doesn't match</p>
              )}
            </label>

            <ButtonPrimary type="submit" disabled={loading || password !== confirmPassword}>
              {loading ? "Signing up..." : "Continue"}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account?{" "}
            <Link className="text-primary-500" href="/login">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
