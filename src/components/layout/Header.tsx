import { Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { useAppSelector } from "../../lib/hooks/hooks";

export default function Header() {
  const { items } = useAppSelector((state) => state.cart);

  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <button
            className="rounded-lg p-2 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>
          <Link
            to="/"
            className="text-xl font-black tracking-tight text-primary-500"
          >
            ShopHub
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary-500"
                  : "text-gray-600 hover:text-gray-900"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-primary-500"
                  : "text-gray-600 hover:text-gray-900"
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-primary-500"
                  : "text-gray-600 hover:text-gray-900"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-primary-500"
                  : "text-gray-600 hover:text-gray-900"
              }
            >
              Contact
            </NavLink>
          </nav>
          <div className="ml-auto hidden max-w-sm flex-1 items-center rounded-xl bg-gray-50 px-3 lg:flex">
            <Search size={17} className="text-gray-400" />
            <input
              className="h-10 w-full bg-transparent px-2 text-sm outline-none"
              placeholder="Search products..."
            />
          </div>
          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <Link
              to="/wishlist"
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-50"
            >
              <Heart size={20} />
            </Link>
            <Link
              to="/account"
              className="hidden rounded-lg p-2 text-gray-600 hover:bg-gray-50 sm:block"
            >
              <UserRound size={20} />
            </Link>
            <Link
              to="/cart"
              className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-50"
            >
              <ShoppingBag size={20} />
              <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-primary-500 px-1 text-[10px] font-bold text-white">
                {items?.length ?? 0}
              </span>
            </Link>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
