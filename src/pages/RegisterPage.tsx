import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import actions from "../api/actions/actions";
import Utils from "../utils";

type Address = {
  label: string;
  street: string;
  zipCode: string;
  city: string;
};

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  addresses: Address[];
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const [values, setValues] = React.useState<RegisterFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    addresses: [
      {
        label: "",
        street: "",
        zipCode: "",
        city: "",
      },
    ],
  });

  const [acceptedTerms, setAcceptedTerms] = React.useState(false);

  const handleChange = (
    field: keyof Omit<RegisterFormValues, "addresses">,
    value: string,
  ) => {
    setValues((previousValues) => ({
      ...previousValues,
      [field]: value,
    }));
  };

  const handleAddressChange = (
    index: number,
    field: keyof Address,
    value: string,
  ) => {
    setValues((previousValues) => ({
      ...previousValues,
      addresses: previousValues.addresses.map((address, addressIndex) =>
        addressIndex === index
          ? {
              ...address,
              [field]: value,
            }
          : address,
      ),
    }));
  };

  const handleAddAddress = () => {
    setValues((previousValues) => ({
      ...previousValues,
      addresses: [
        ...previousValues.addresses,
        {
          label: "",
          street: "",
          zipCode: "",
          city: "",
        },
      ],
    }));
  };

  const handleRemoveAddress = (index: number) => {
    setValues((previousValues) => ({
      ...previousValues,
      addresses: previousValues.addresses.filter(
        (_, addressIndex) => addressIndex !== index,
      ),
    }));
  };

  const regiseterMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: unknown) => await actions.register(data),
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!acceptedTerms) {
      return;
    }

    const payload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      password: values.password,
      phone: values.phone.trim(),
      addresses: values.addresses
        .filter(
          (address) =>
            address.label || address.street || address.zipCode || address.city,
        )
        .map((address) => ({
          label: address.label.trim(),
          street: address.street.trim(),
          zipCode: address.zipCode.trim(),
          city: address.city.trim(),
        })),
    };

    try {
      try {
        const { error, message } = await regiseterMutation.mutateAsync(payload);
        Utils.notify(error, message, () => navigate("/login"));
      } catch (error) {
        Utils.notify("Network error");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-14 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-black">Create your account</h1>

        <p className="mt-2 text-sm text-gray-500">
          Join DigniCare and make every checkout faster.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-5 rounded-2xl border border-gray-100 p-5 sm:p-7"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            First name
            <Input
              className="mt-2"
              value={values.firstName}
              onChange={(event) =>
                handleChange("firstName", event.target.value)
              }
              placeholder="John"
              required
            />
          </label>

          <label className="text-sm font-semibold">
            Last name
            <Input
              className="mt-2"
              value={values.lastName}
              onChange={(event) => handleChange("lastName", event.target.value)}
              placeholder="Doe"
              required
            />
          </label>
        </div>

        <label className="text-sm font-semibold">
          Email
          <Input
            className="mt-2"
            type="email"
            value={values.email}
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder="john@example.com"
            required
          />
        </label>

        <label className="text-sm font-semibold">
          Phone
          <Input
            className="mt-2"
            type="tel"
            value={values.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            placeholder="+256 700 000000"
            required
          />
        </label>

        <label className="text-sm font-semibold">
          Password
          <Input
            className="mt-2"
            type="password"
            value={values.password}
            onChange={(event) => handleChange("password", event.target.value)}
            placeholder="Create a strong password"
            required
          />
        </label>

        <div className="border-t border-gray-100 pt-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">Addresses</h2>

              <p className="mt-1 text-xs text-gray-500">
                Add your home, office or delivery addresses.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddAddress}
              className="flex items-center gap-1 text-sm font-semibold text-primary-500"
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          <div className="mt-5 grid gap-5">
            {values.addresses.map((address, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">Address {index + 1}</p>

                  {values.addresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAddress(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold">
                    Label
                    <Input
                      className="mt-2"
                      value={address.label}
                      onChange={(event) =>
                        handleAddressChange(index, "label", event.target.value)
                      }
                      placeholder="Home"
                    />
                  </label>

                  <label className="text-sm font-semibold">
                    City
                    <Input
                      className="mt-2"
                      value={address.city}
                      onChange={(event) =>
                        handleAddressChange(index, "city", event.target.value)
                      }
                      placeholder="Kampala"
                    />
                  </label>

                  <label className="text-sm font-semibold sm:col-span-2">
                    Street
                    <Input
                      className="mt-2"
                      value={address.street}
                      onChange={(event) =>
                        handleAddressChange(index, "street", event.target.value)
                      }
                      placeholder="Plot 10 Kampala Road"
                    />
                  </label>

                  <label className="text-sm font-semibold sm:col-span-2">
                    ZIP code
                    <Input
                      className="mt-2"
                      value={address.zipCode}
                      onChange={(event) =>
                        handleAddressChange(
                          index,
                          "zipCode",
                          event.target.value,
                        )
                      }
                      placeholder="00000"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2 text-sm text-gray-500">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            className="mt-1 accent-primary-500"
          />

          <span>I agree to the Terms and Conditions and Privacy Policy.</span>
        </label>

        <Button
          type="submit"
          size="lg"
          disabled={!acceptedTerms || regiseterMutation.isPending}
        >
          {regiseterMutation.isPending
            ? "Creating account..."
            : "Create account"}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link className="font-bold text-primary-500" to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
