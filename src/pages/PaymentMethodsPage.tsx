import { CreditCard, Plus } from "lucide-react";
import { useState } from "react";
import PageHero from "../components/common/PageHero";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";

export default function PaymentMethodsPage(){const[open,setOpen]=useState(false);return <><PageHero title="Payment methods" subtitle="Manage saved cards and preferred payment options."/><div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8"><div className="flex justify-end"><Button onClick={()=>setOpen(true)}><Plus size={17}/>Add payment method</Button></div><div className="mt-5 grid gap-5 md:grid-cols-2"><div className="rounded-2xl bg-gray-950 p-6 text-white shadow-soft"><CreditCard/><div className="mt-10 text-lg tracking-[0.2em]">•••• •••• •••• 4242</div><div className="mt-4 flex justify-between text-xs text-gray-400"><span>JOHN DOE</span><span>12/28</span></div></div></div></div><Modal open={open} onOpenChange={setOpen} title="Add payment method"><div className="grid gap-3"><Input placeholder="Card number"/><div className="grid grid-cols-2 gap-3"><Input placeholder="MM/YY"/><Input placeholder="CVV"/></div><Input placeholder="Name on card"/><Button onClick={()=>setOpen(false)}>Save card</Button></div></Modal></>}
