import { PackageOpen } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="mx-auto max-w-lg py-20 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary-50 text-primary-500">
        <PackageOpen size={28} />
      </div>
      <h2 className="mt-5 text-xl font-black">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-gray-500">{body}</p>
      <Link to="/shop" className="mt-6 inline-block">
        <Button>Browse products</Button>
      </Link>
    </div>
  );
}
