import { useState } from "react";
import {
  IoMdArrowDropdown,
  IoIosContact,
  IoIosCog,
  IoIosLogOut,
} from "react-icons/io";
import { Form } from "react-router";
import { generatePath } from "~/constants/";

interface FuncProp {
  toggleMenu: () => void;
  user: any;
}

export default function MenuToggler({ toggleMenu, user }: FuncProp) {
  return (
    <div className="flex sticky top-0 right-0 w-full justify-end items-center bg-black text-white h-16">
   
      <div className="flex items-center justify-end">
        <ul className="flex w-full h-6 justify-between text-lg">
          {/* User Menu ""*/}
          <li className="relative flex items-center mr-6">
            <label
              htmlFor="userMenu"
              className="flex items-center cursor-pointer gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-slate-500 overflow-hidden">
                <img
                  src="/assets/images/user/defaultUser.jpeg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:flex text-sm">
                Hello,&nbsp;
                <span className="font-bold">
                  {" "}
                  {user.user_metadata?.full_name || user.email}
                </span>
              </div>
              <IoMdArrowDropdown />
            </label>

            <input type="checkbox" id="userMenu" className="hidden peer" />

            <div className="peer-checked:block hidden absolute right-0 top-12 w-60 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-100">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li className="px-3">
                  <button className="flex w-full items-center gap-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <IoIosContact className="text-xl" /> Profile
                  </button>
                </li>
                <li className="px-3">
                  <button className="flex w-full items-center gap-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <IoIosCog className="text-xl" /> Profile Setting
                  </button>
                </li>
                <li className="px-3">
                  <button className="flex w-full items-center gap-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <IoIosCog className="text-xl" /> Feeds Preference
                  </button>
                </li>
              </ul>
              <Form
                method="post"
                action={generatePath("logout")}
                className="border-t border-gray-200 dark:border-gray-600"
              >
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <IoIosLogOut className="text-2xl" />
                  Logout
                </button>
              </Form>
            </div>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-4 focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"
          onClick={() => toggleMenu()}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
