import { useState } from "react";
import { Link } from "react-router"; // ✅ correct import for React Router v7
import { MenuLinks } from "./MenuLinks";

export default function MenuItem() {
  const [menuItems, setMenuItems] = useState(
    MenuLinks.map((item) => ({ ...item, isOpen: false }))
  );

  const toggleMenu = (id: number) => {
    setMenuItems((prev) =>
      prev.map((menu) =>
        menu.id === id ? { ...menu, isOpen: !menu.isOpen } : menu
      )
    );
  };

  const baseClasses =
    "block py-2.5 px-4 flex items-center space-x-2 text-white hover:bg-gray-800 hover:text-white rounded";

  return (
    <nav className="flex flex-col gap-y-1">
      {menuItems.map((item) => {
        switch (item.type) {
          /** ───────────────────────────────
           *  BASIC LINK
           *  ─────────────────────────────── */
          case "link":
            return (
              <Link
                key={item.id}
                to={item.url}
                className={`${item.isActive ? "bg-gray-800" : ""} ${baseClasses}`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            );

          /** ───────────────────────────────
           *  DROPDOWN MENU
           *  ─────────────────────────────── */
          case "dropdown":
            return (
              <div key={item.id} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => toggleMenu(item.id)}
                  className={`justify-between cursor-pointer ${baseClasses} ${
                    item.isActive ? "bg-gray-800" : ""
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      item.isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>

                {item.isOpen && (
                  <div className="text-sm border-l-2 border-gray-700 mx-6 my-2.5 px-2.5 flex flex-col gap-y-1">
                    {item.subMenu?.map((link, i) => (
                      <Link
                        key={`sub_${i}`}
                        to={link.url}
                        className="flex items-center w-full py-2 px-4 hover:bg-gray-800 hover:text-white rounded"
                      >
                        {link.icon}
                        <span className="ml-2">{link.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </nav>
  );
}
