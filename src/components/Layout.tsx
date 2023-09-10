// components/Layout.tsx
import SideBar from './SideBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const menus = [
    { href: "/menu1", label: "Menu 1", icon: "🅰️" },
    { href: "/menu2", label: "Menu 2", icon: "🅱️" },
    { href: "/menu3", label: "Menu 3", icon: "🅾️" }
  ];

  return (
    <div className="flex">
      <SideBar menus={menus} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

export default Layout;
