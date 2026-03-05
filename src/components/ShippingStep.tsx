import { useState } from "react";
import { useCheckout, ShippingAddress } from "@/context/CheckoutContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";

const initial: ShippingAddress = { fullName: "", email: "", phone: "", pinCode: "", city: "", state: "" };

type Errors = Partial<Record<keyof ShippingAddress, string>>;

const validate = (v: ShippingAddress): Errors => {
  const e: Errors = {};
  if (!v.fullName.trim()) e.fullName = "Required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Invalid email";
  if (!/^\d{10}$/.test(v.phone)) e.phone = "Must be 10 digits";
  if (!/^\d{6}$/.test(v.pinCode)) e.pinCode = "Must be 6 digits";
  if (!v.city.trim()) e.city = "Required";
  if (!v.state.trim()) e.state = "Required";
  return e;
};

const fields: { key: keyof ShippingAddress; label: string; placeholder: string; type?: string }[] = [
  { key: "fullName", label: "Full Name", placeholder: "John Doe" },
  { key: "email", label: "Email", placeholder: "john@example.com", type: "email" },
  { key: "phone", label: "Phone Number", placeholder: "9876543210", type: "tel" },
  { key: "pinCode", label: "PIN Code", placeholder: "110001" },
  { key: "city", label: "City", placeholder: "New Delhi" },
  { key: "state", label: "State", placeholder: "Delhi" },
];

const ShippingStep = () => {
  const { setStep, setShippingAddress, shippingAddress } = useCheckout();
  const [form, setForm] = useState<ShippingAddress>(shippingAddress ?? initial);
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setShippingAddress(form);
      setStep("payment");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-display font-bold mb-6">Shipping Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <Label htmlFor={f.key} className="text-sm font-medium">
              {f.label}
            </Label>
            <Input
              id={f.key}
              type={f.type ?? "text"}
              placeholder={f.placeholder}
              value={form[f.key]}
              onChange={(e) => {
                setForm({ ...form, [f.key]: e.target.value });
                if (errors[f.key]) setErrors({ ...errors, [f.key]: undefined });
              }}
              className={`mt-1 h-11 ${errors[f.key] ? "border-destructive ring-1 ring-destructive" : ""}`}
            />
            {errors[f.key] && <p className="text-destructive text-xs mt-1">{errors[f.key]}</p>}
          </div>
        ))}
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => setStep("cart")} className="h-11">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <Button type="submit" className="flex-1 h-11 font-semibold">
            Continue <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippingStep;
