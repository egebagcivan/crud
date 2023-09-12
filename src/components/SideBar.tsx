// components/SideBar.tsx
import Link from "next/link";
import { useState, ReactNode } from "react";

interface MenuItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;  // Note this change
}

interface SidebarProps {
  menus: MenuItem[];
}

const SideBar: React.FC<SidebarProps> = ({ menus }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={`w-${expanded ? "64" : "20"} bg-base-300 text-base-content min-h-screen flex flex-col p-4 transition-all duration-300 shadow-lg`}
    >
      <div className="flex-grow mb-6">
        <div className="flex justify-end items-center text-accent-content">
          <span 
            onClick={() => setExpanded(!expanded)} 
            className="cursor-pointer p-2 rounded-full hover:bg-base-300 transition-all"
          >
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
          </span>
        </div>

        <nav>
          <ul>
            {menus.map((menu, index) => (
              <li key={index} className="mb-3 text-accent-content">
                <Link href={menu.href}>
                  <p className="flex items-center hover:bg-slate-700 p-2 rounded transition-all">
                  <menu.icon className="text-2xl mr-3 h-7" />
                    {expanded && (
                      <span className="text-base">{menu.label}</span>
                    )}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
