import React, { useEffect, useState } from "react";
import { GoKey } from "react-icons/go";
import { GrMail } from "react-icons/gr";
import { FaKeycdn } from "react-icons/fa";
import { Form, redirect, useActionData, useNavigation } from "react-router";
import { validateAction } from "~/utils";
import {
  registrationSchema,
  type RegistrationSchema,
} from "~/validations/auth";
import type { ActionFunction, LoaderFunction } from "react-router";
import { generatePath } from "~/constants";
import { createSupabaseClient } from "~/utils/supabase-client.server";

// ----------------- SERVER FUNCTIONS -----------------
export const load: LoaderFunction = async () => {};

export const action: ActionFunction = async ({ request }) => {
  const { formData, errors } = await validateAction<RegistrationSchema>({
    request,
    schema: registrationSchema,
  });

  if (errors) return { success: false, errors };

  const { email, password, confirmPassword } = formData;
  const client = createSupabaseClient(request);

  // Dynamically determine the base URL of the current app
  const origin = new URL(request.url).origin;

  const { data, error } = await client.supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/login` },
  });

  if (error) return { success: false, message: error.message };
  // If sign-up succeeds
  if (data?.user) {
    return {
      success: true,
      message:
        "Registration successful. Please check your email to verify your account.",
    };
  }

  return {
    success: false,
    message: "Unexpected response from server.",
  };
};

// ----------------- CLIENT COMPONENT -----------------
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  if (actionData?.success && navigation.state === "idle") {
    const form = document.getElementById("register-form");
    if (form) form?.reset(); // ✅ clears input fields
  }
  return (
    <div className="flex justify-center self-center z-10">
      <div className="block w-96 max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-950 dark:border-gray-700">
        <div className="my-4 grid grid-cols-1 place-items-center">
          <img
            src="/assets/images/logo.png"
            alt="logo"
            className="w-3/6 mb-2"
          />
          <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">
            Register Here
          </h3>
        </div>

        {/* Display Supabase response */}
        {actionData && (
          <>
            {actionData.success ? (
              <div
                className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Error: </span>
                  {actionData.message}
                </div>
              </div>
            ) : (
              <div
                className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Success: </span>{" "}
                  {actionData.message}
                </div>
              </div>
            )}
          </>
        )}

        <Form method="post" className="space-y-3" id="register-form">
          {/* EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-700">
                <GrMail fontSize="1rem" />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="hello@example.com"
                autoComplete="off"
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:outline-none focus:border-green-400"
              />
            </div>
            {actionData?.errors?.email && (
              <p className="text-red-500 text-xs mt-1">
                {actionData.errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="flex relative">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-700">
                <GoKey fontSize="1rem" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:outline-none focus:border-green-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 inset-y-0 flex items-center text-green-600"
                tabIndex={-1}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {actionData?.errors?.password && (
              <p className="text-red-500 text-xs mt-1">
                {actionData.errors.password}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <div className="flex relative">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-700">
                <FaKeycdn fontSize="1rem" />
              </span>
              <input
                type={showCPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:outline-none focus:border-green-400"
              />
              <button
                type="button"
                onClick={() => setShowCPassword(!showCPassword)}
                className="absolute right-3 inset-y-0 flex items-center text-green-600"
                tabIndex={-1}
              >
                {showCPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {actionData?.errors?.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {actionData.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-gray-100 p-3 rounded-lg font-semibold transition ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register Me"}
            </button>
          </div>

          <p className="text-gray-500 dark:text-gray-200 text-xs text-center">
            Already have an account?{" "}
            <a
              href={generatePath("login")}
              className="text-sm text-green-500 hover:text-green-600"
            >
              Login
            </a>
          </p>
        </Form>

        <div className="mt-7 text-center text-gray-500 dark:text-gray-300 text-xs">
          <span>
            Copyright © {new Date().getFullYear()}&ensp;
            <a
              href="https://github.com/Ndollawa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600"
            >
              Ndubusisi
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
