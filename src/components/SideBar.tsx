// components/SideBar.tsx
import Link from 'next/link';
import { useState } from 'react';

interface MenuItem {
  href: string;
  label: string;
  icon: string;  // Placeholder for an icon or emoji
}

interface SidebarProps {
  menus: MenuItem[];
}

const SideBar: React.FC<SidebarProps> = ({ menus }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`w-${expanded ? '64' : '20'} transition-all duration-300 min-h-screen bg-white shadow-md p-4 flex flex-col`}>
      
      <div className="flex-grow">
        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold mr-2">Logo</span>
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? "🍔" : "🔙"}
          </button>
        </div>
        
        <nav>
          <ul>
            {menus.map((menu, index) => (
              <li key={index} className="mb-2 flex items-center">
                <span className="mr-2">{menu.icon}</span>
                {expanded && <Link href={menu.href}><p className="btn btn-accent">{menu.label}</p></Link>}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-4 mb-2 flex items-center">
        <span className="mr-2">🔑</span>
        {expanded && <Link href="/login"><p className="hover:underline">Login</p></Link>}
      </div>

    </div>
  );
}

export default SideBar;
