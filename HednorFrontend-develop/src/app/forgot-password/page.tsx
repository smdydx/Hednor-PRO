import React from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";

const PageForgotPass = ({}) => {
  return (
    <div className="container max-w-md  p-10 my-10 lg:my-10 rounded-3xl sm:border-2 sm:border-primary-500">
      <header className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="mb-8 flex items-center text-2xl leading-[115%] md:text-3xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Forgot password
        </h2>
        <span className="block text-sm text-red-400 sm:text-base bg-primary-50 rounded-lg p-3">
          *** Enter your register email ***
        </span>
      </header>

      <div className="mx-auto space-y-6">
        {/* FORM */}
        <form className="grid grid-cols-1 gap-6" action="#" method="post">
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Email address
            </span>
            <Input
              type="email"
              placeholder="example@example.com"
              className="mt-1"
            />
          </label>
          <ButtonPrimary type="submit">Continue</ButtonPrimary>
        </form>

        {/* ==== */}
        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          Go back for {` `}
          <Link href="/login" className="text-primary-500 font-semibold">
            Sign in
          </Link>
          {` / `}
          <Link href="/signup" className="text-primary-500 font-semibold">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PageForgotPass;
