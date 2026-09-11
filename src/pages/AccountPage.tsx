import React from "react";
import { Package, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import PageHero from "../components/common/PageHero";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Suspense from "../components/common/Suspense";
import actions from "../api/actions/actions";
import Utils from "../utils";

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export default function AccountPage() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-loggedin-user"],
    queryFn: async () => await actions.getLoggedinUser(),
  });

  const [values, setValues] = React.useState<ProfileFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  React.useEffect(() => {
    if (!data) return;

    setValues({
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
    });
  }, [data]);

  const handleChange = (field: keyof ProfileFormValues, value: string) => {
    setValues((previousValues) => ({
      ...previousValues,
      [field]: value,
    }));
  };

  const updateMutation = useMutation({
    mutationKey: ["update-account", data?._id],
    mutationFn: async () => await actions.updateUser(values),
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { error, message } = await updateMutation.mutateAsync();
      Utils.notify(error, message, () => {
        refetch();
      });
    } catch (error) {
      Utils.notify("Network error");
    }
  };

  return (
    <>
      <PageHero
        title="My account"
        subtitle="Manage profile details, addresses, payments and purchases."
      />

      <Suspense isLoading={isLoading}>
        <div className="mx-auto grid max-w-6xl gap-7 px-4 py-10 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
          <aside className="h-fit rounded-2xl border border-gray-100 p-3">
            {[
              [UserRound, "Profile", "/account"],
              [Package, "Orders", "/orders"],
            ].map(([Icon, label, to]) => (
              <Link
                key={String(label)}
                to={String(to)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-600 hover:bg-primary-50 hover:text-primary-600"
              >
                <Icon size={18} />
                {String(label)}
              </Link>
            ))}
          </aside>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-100 p-5 sm:p-7"
          >
            <h2 className="text-xl font-black">Profile information</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                First name
                <Input
                  className="mt-2"
                  value={values.firstName}
                  onChange={(event) =>
                    handleChange("firstName", event.target.value)
                  }
                  placeholder="Enter first name"
                />
              </label>

              <label className="text-sm font-semibold">
                Last name
                <Input
                  className="mt-2"
                  value={values.lastName}
                  onChange={(event) =>
                    handleChange("lastName", event.target.value)
                  }
                  placeholder="Enter last name"
                />
              </label>

              <label className="text-sm font-semibold sm:col-span-2">
                Email
                <Input
                  className="mt-2"
                  type="email"
                  value={values.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  placeholder="Enter email address"
                />
              </label>

              <label className="text-sm font-semibold sm:col-span-2">
                Phone
                <Input
                  className="mt-2"
                  type="tel"
                  value={values.phone}
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                  placeholder="Enter phone number"
                />
              </label>
            </div>

            <Button
              type="submit"
              className="mt-6"
              disabled={updateMutation.isPending}
            >
              Save changes
            </Button>
          </form>
        </div>
      </Suspense>
    </>
  );
}
