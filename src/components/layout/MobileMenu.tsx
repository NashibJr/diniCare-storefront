import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 transition lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <button
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close menu"
      />
      <aside
        className={`absolute left-0 top-0 h-full w-72 bg-white p-5 shadow-2xl transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="text-xl font-black text-primary-500">
            DigniCare{" "}
          </span>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        <div className="grid gap-2 text-sm font-semibold text-gray-700">
          {[
            ["/", "Home"],
            ["/shop", "Shop"],
            // ["/wishlist", "Wishlist"],
            ["/orders", "My Orders"],
            ["/account", "My Account"],
            ["/about", "About"],
            ["/contact", "Contact"],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className="rounded-xl px-3 py-3 hover:bg-primary-50 hover:text-primary-600"
            >
              {label}
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
