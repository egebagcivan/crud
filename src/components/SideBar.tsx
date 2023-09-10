// components/SideBar.tsx
import Link from "next/link";
import { useState } from "react";

interface MenuItem {
  href: string;
  label: string;
  icon: string; // Placeholder for an icon or emoji
}

interface SidebarProps {
  menus: MenuItem[];
}

const SideBar: React.FC<SidebarProps> = ({ menus }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={`w-${
        expanded ? "64" : "20"
      } bg-base-100 flex min-h-screen flex-col p-4 shadow-md transition-all duration-300`}
    >
      <div className="flex-grow">
        <div className="mb-4 flex items-center">
          <div className="flex-none">
            <button onClick={() => setExpanded(!expanded)} className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <nav>
          <ul>
            {menus.map((menu, index) => (
              <li key={index} className="mb-2 flex items-center">
                <span className="mr-2">{menu.icon}</span>
                {expanded && (
                  <Link href={menu.href}>
                    <p className="btn btn-accent">{menu.label}</p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mb-2 mt-4 flex items-center">
        <span className="mr-2">🔑</span>
        {expanded && (
          <Link href="/login">
            <p className="hover:underline">Login</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideBar;
