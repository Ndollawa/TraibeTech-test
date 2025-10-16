import React, { useState } from "react";
import {
  IoMdMail,
  IoMdNotifications,
  IoMdCog,
  IoMdArrowDropdown,
  IoIosPersonAdd,
  IoIosContact,
  IoIosCog,
  IoIosLogOut,
} from "react-icons/io";
import { Form, redirect, useLoaderData, type LoaderFunction } from "react-router";
import { Link } from "react-router";


interface FuncProp {
  toggleMenu: () => void;
  user:any
}

export default function MenuToggler({ toggleMenu, user}: FuncProp) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex fixed top-0 right-0 w-full justify-between items-center bg-black text-white h-16">
      <img
        src="/assets/images/logo.png"
        alt="logo"
        className="rounded-xs w-40 lg:w-64 lg:h-14 object-cover m-4 my-2"
      />

      <div className="flex items-center md:mr-24">
        <ul className="flex w-full h-6 justify-between text-lg">
          <li className="relative flex items-center mr-6">
            <label
              htmlFor="userMenu"
              className="flex items-center cursor-pointer gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-slate-500 overflow-hidden">
                <img
                  src="/assets/images/user/defaultUser.jpeg"
                  alt="user avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:flex text-sm">
                Hello,&nbsp;
                <span className="font-bold">
                  {user.user_metadata?.full_name || user.email}
                </span>
              </div>
              <IoMdArrowDropdown />
            </label>

            <input type="checkbox" id="userMenu" className="hidden peer" />
            {/* menu omitted for brevity */}
          </li>
        </ul>
      </div>
    </div>
  );
}
