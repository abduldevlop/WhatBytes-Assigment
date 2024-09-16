import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Navbar at the top */}
      <NavBar />

      {/* Sidebar and content layout */}
      <div className="flex">
        {/* Sidebar (fixed and hidden on small screens) */}
        <div className={` w-64 h-screen md:block hidden`}>
          <SideBar />
        </div>

        {/* Main content */}
        <div className={`flex-1 }`}>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
