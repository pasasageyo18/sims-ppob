import { Outlet, useLocation, useNavigate } from "react-router";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between px-24 py-4 border-b border-b-gray-200">
        <div
          className="flex gap-2 hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/Logo.png" alt="logo" width={24} height={24} />
          <p className="font-semibold">SIMS PPOB</p>
        </div>
        <div className="flex gap-10">
          <a
            href="/topup"
            className={`${
              isActive("/topup") ? "text-red-500" : "hover:text-red-500"
            } transition-colors font-semibold`}
          >
            Top Up
          </a>
          <a
            href="/transaction/history"
            className={`${
              isActive("/transaction/history")
                ? "text-red-500"
                : "hover:text-red-500"
            } transition-colors font-semibold`}
          >
            Transaction
          </a>
          <a
            href="/profile"
            className={`${
              isActive("/profile") ? "text-red-500" : "hover:text-red-500"
            } transition-colors font-semibold`}
          >
            Akun
          </a>
        </div>
      </header>
      <main className="flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
