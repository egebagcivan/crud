// components/Layout.tsx
import { signIn, signOut, useSession } from "next-auth/react";
import SideBar from './SideBar';
import NavBar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();

  const menus = [
    { href: "/", label: "Dashboard", icon: "🅰️" },
    { href: "/books", label: "Books", icon: "🅱️" },
    { href: "/settings", label: "Settings", icon: "🅾️" }
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
