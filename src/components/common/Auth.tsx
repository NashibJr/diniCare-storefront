import { Navigate, Outlet, useLocation } from "react-router-dom";

const Auth = () => {
  const { pathname } = useLocation();
  const session = localStorage.getItem("token");

  if (
    !session &&
    (pathname.includes("orders") || pathname.includes("account"))
  ) {
    return <Navigate to={"/login"} replace />;
  }

  if (session && pathname === "/login") {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default Auth;
