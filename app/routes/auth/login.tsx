import { GoKey } from "react-icons/go";
import { GrMail } from "react-icons/gr";
import { useState, useEffect } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  type ActionFunction,
} from "react-router";
import { generatePath } from "~/constants";
import { validateAction } from "~/utils";
import { loginSchema, type LoginSchema } from "~/validations/auth";
import { redirect } from "react-router";
import { createSupabaseClient } from "~/utils/supabase-client.server";

interface ActionError {
  formError?: string;
  fieldErrors?: Record<string, string>;
}

/* ------------------ SERVER ACTION ------------------ */
export const action: ActionFunction = async ({ request }) => {
  const { formData, errors } = await validateAction<LoginSchema>({
    request,
    schema: loginSchema,
  });

  if (errors) {
    return { fieldErrors: errors } as ActionError;
  }
  const { email, password } = formData;
  const { supabase, headers } = createSupabaseClient(request);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { formError: error.message };
  }
  return redirect(generatePath("dashboard"), {
    headers,
  });
};

/* ------------------ CLIENT COMPONENT ------------------ */
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const actionData = useActionData<ActionError>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (actionData?.formError) {
      setFormError(actionData.formError);
    }
  }, [actionData]);

  return (
    <div className="flex justify-center inset-0 items-center self-center z-10">
      <div className="block w-96 max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-950 dark:border-gray-700">
        <div className="my-4 grid grid-cols-1 place-items-center">
          <img
            src={`/assets/images/logo.png`}
            alt="logo"
            className="w-3/6 mb-2"
          />
          <h3 className="font-bold text-center text-xl text-gray-800 dark:text-gray-100">
            Login
          </h3>
        </div>

        {/* Display Supabase response */}

        {formError && (
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
            <span className="sr-only">Error</span>
            <div>
              <span className="font-medium">Error!</span>
              {formError}
            </div>
          </div>
        )}

        <Form method="post" className="space-y-3">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-[#194253] dark:text-white"
            >
              Email
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-[#194253] bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-800">
                <GrMail fontSize="1rem" />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                disabled={isSubmitting}
                className="rounded-none rounded-r-lg bg-gray-50 border text-[#194253] block flex-1 w-full text-sm border-gray-300 p-2.5 focus:outline-none focus:border-green-400 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                placeholder="hello@example.com"
                aria-invalid={!!actionData?.fieldErrors?.email}
              />
            </div>
            {actionData?.fieldErrors?.email && (
              <p className="text-red-500 text-xs mt-1">
                {actionData.fieldErrors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-[#194253] dark:text-white"
            >
              Password
            </label>
            <div className="flex relative">
              <span className="inline-flex items-center px-3 text-sm text-[#194253] bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-700">
                <GoKey fontSize="1rem" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                disabled={isSubmitting}
                autoComplete="off"
                className="rounded-none rounded-r-lg bg-gray-50 border text-[#194253] block flex-1 w-full text-sm border-gray-300 p-2.5 focus:outline-none focus:border-green-400 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                placeholder="Password"
                aria-invalid={!!actionData?.fieldErrors?.password}
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
            {actionData?.fieldErrors?.password && (
              <p className="text-red-500 text-xs mt-1">
                {actionData.fieldErrors.password}
              </p>
            )}
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-xs text-green-500">
              <input
                type="checkbox"
                name="rememberMe"
                className="mr-2 accent-green-600"
                disabled={isSubmitting}
              />
              Trust this device?
            </label>
            <a href="#" className="text-xs text-green-500 hover:text-green-600">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-gray-100 p-3 rounded-lg font-semibold transition duration-300 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {/* Footer Link */}
          <p className="text-gray-500 dark:text-gray-200 text-xs text-center mt-2">
            Don't have an account?{" "}
            <a
              href={generatePath("register")}
              className="text-sm text-green-500 hover:text-green-600"
            >
              Register
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
