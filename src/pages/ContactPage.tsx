import React from "react";
import PageHero from "../components/common/PageHero";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast.success("Your message was successfully recorded");
  };

  return (
    <>
      <PageHero
        title="Contact us"
        subtitle="Questions about an order or product? Our support team is ready to help."
      />
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8"
      >
        <div className="rounded-2xl border border-gray-100 p-5 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Name
              <Input required className="mt-2" />
            </label>
            <label className="text-sm font-semibold">
              Email
              <Input required className="mt-2" type="email" />
            </label>
            <label className="text-sm font-semibold sm:col-span-2">
              Subject
              <Input required className="mt-2" />
            </label>
            <label className="text-sm font-semibold sm:col-span-2">
              Message
              <Textarea required className="mt-2" />
            </label>
          </div>
          <Button className="mt-5">Send message</Button>
        </div>
        <div className="rounded-2xl bg-gray-950 p-6 text-white">
          <h2 className="text-xl font-black">Support</h2>
          <div className="mt-5 grid gap-5 text-sm text-gray-300">
            <div>
              <div className="font-bold text-white">Email</div>
              <div className="mt-1">support@dignicare .test</div>
            </div>
            <div>
              <div className="font-bold text-white">Phone</div>
              <div className="mt-1">+1 234 567 8000</div>
            </div>
            <div>
              <div className="font-bold text-white">Hours</div>
              <div className="mt-1">Mon–Sun · 24/7</div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
