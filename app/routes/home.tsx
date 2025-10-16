import { Link } from "react-router";
import type { Route } from "./+types/home";
import { generatePath } from "~/constants";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full h-screen">
      {" "}
      <p className="mb-5 text-gray-900 dark:text-gray-100">Hello, Good day to you.</p>
      <div className="flex gap-5">
      <Link
        to={generatePath("articles")}
        className="bg-green-600 dark:bg-green-500 text-white  py-2.5 px-4 rounded"
      >
        View Core Deliverables
      </Link>
      <Link
        to={generatePath("login")}
        className="bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-white  py-2.5 px-4 rounded"
      >
        Login
      </Link>
    </div></div>
  );
}
