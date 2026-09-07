import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function ConfirmationPage(){return <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6"><CheckCircle2 className="mx-auto text-emerald-500" size={76}/><h1 className="mt-6 text-3xl font-black">Thank you for your order!</h1><p className="mt-3 text-sm leading-6 text-gray-500">Your order has been placed successfully. We sent a confirmation to <strong>john@example.com</strong>.</p><div className="mx-auto mt-6 rounded-2xl bg-gray-50 p-5"><div className="text-xs font-bold uppercase tracking-wide text-gray-400">Order number</div><div className="mt-1 text-xl font-black">#SH12345678</div></div><div className="mt-7 grid gap-3 sm:grid-cols-2"><Link to="/orders/SH12345678"><Button className="w-full">View order</Button></Link><Link to="/shop"><Button variant="secondary" className="w-full">Continue shopping</Button></Link></div></div>}
