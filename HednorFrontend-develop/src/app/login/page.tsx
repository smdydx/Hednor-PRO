'use client';
import React, { useEffect, useState } from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { tokenStore } from "@/state/slice/authSlice";
import { loginAuth } from "@/utils/api/auth";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";

const PageLogin: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCheckingToken, setIsCheckingToken] = useState<boolean>(true);

  const mutation = useMutation({
    mutationFn: loginAuth,
    onSuccess: (data) => {
      console.log('Login success:', data.access_token);
      dispatch(tokenStore({ token: data.access_token }));
      router.push("/account");
      setLoading(false);
    },
    onError: (error: Error) => {
      console.error('Login failed', error);
      alert(error.message);
      setLoading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    mutation.mutate({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
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
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container max-w-md p-10 my-10 lg:my-10 rounded-3xl sm:border-2 sm:border-primary-500">
        <h2 className="mb-10 flex items-center text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">Email address</span>
              <Input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link href="/forgot-password" className="text-sm text-primary-500">
                  Forgot password?
                </Link>
              </span>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="mt-1"
              />
            </label>
            <ButtonPrimary type="submit" disabled={loading}>
              {loading ? "Loading..." : "Continue"}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user?{" "}
            <Link className="text-primary-500" href="/signup">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
