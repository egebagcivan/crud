// components/Layout.tsx
import { signIn, signOut, useSession } from "next-auth/react";
import SideBar from './SideBar';
import NavBar from './Navbar';
import { HomeIcon, BookOpenIcon, CogIcon } from '@heroicons/react/24/solid';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();

  const menus = [
    { href: "/", label: "Dashboard", icon: HomeIcon },
    { href: "/books", label: "Books", icon: BookOpenIcon },
    { href: "/settings", label: "Settings", icon: CogIcon }
  ];
  
 
  return (
    <div className="flex">
      {session ? (
        <>
          <SideBar menus={menus} />
          <div className="flex-1">
            <NavBar />
            {children}
          </div>
        </>
      ) : (
        <div className="flex-1">
          {children}
        </div>
      )}
    </div>
  );
}

export default Layout;
