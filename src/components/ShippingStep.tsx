import { useState } from "react";
import { useCheckout, ShippingAddress } from "@/context/CheckoutContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Plus, MapPin, Trash2, Check } from "lucide-react";
import StickyBottomBar from "@/components/StickyBottomBar";

const emptyAddr: Omit<ShippingAddress, "id"> = { fullName: "", email: "", phone: "", pinCode: "", city: "", state: "" };

type Errors = Partial<Record<keyof typeof emptyAddr, string>>;

const validate = (v: typeof emptyAddr): Errors => {
  const e: Errors = {};
  if (!v.fullName.trim()) e.fullName = "Required";
  if (!v.email.trim()) e.email = "Required";
  else if (!v.email.includes("@")) e.email = "Email must contain @";
  if (!/^\d{10}$/.test(v.phone)) e.phone = "Must be 10 digits";
  if (!/^\d{6}$/.test(v.pinCode)) e.pinCode = "Must be 6 digits";
  if (!v.city.trim()) e.city = "Required";
  if (!v.state.trim()) e.state = "Required";
  return e;
};

const fields: { key: keyof typeof emptyAddr; label: string; placeholder: string; type?: string; half?: boolean }[] = [
  { key: "fullName", label: "Full Name", placeholder: "John Doe" },
  { key: "email", label: "Email", placeholder: "john@example.com", type: "email" },
  { key: "phone", label: "Phone Number", placeholder: "9876543210", type: "tel" },
  { key: "pinCode", label: "PIN Code", placeholder: "110001", half: true },
  { key: "city", label: "City", placeholder: "New Delhi", half: true },
  { key: "state", label: "State", placeholder: "Delhi" },
];

const ShippingStep = () => {
  const { setStep, savedAddresses, selectedAddressId, addAddress, removeAddress, selectAddress } = useCheckout();
  const [showForm, setShowForm] = useState(savedAddresses.length === 0);
  const [form, setForm] = useState(emptyAddr);
  const [errors, setErrors] = useState<Errors>({});

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      addAddress({ ...form, id: crypto.randomUUID() });
      setForm(emptyAddr);
      setShowForm(false);
    }
  };

  const canProceed = !!selectedAddressId;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">Shipping Address</h2>
      <p className="text-muted-foreground text-sm mb-6">Select a saved address or add a new one</p>

      {/* Saved addresses */}
      {savedAddresses.length > 0 && (
        <div className="space-y-3 mb-6">
          {savedAddresses.map((addr) => {
            const isSelected = addr.id === selectedAddressId;
            return (
              <div
                key={addr.id}
                onClick={() => selectAddress(addr.id)}
                className={`relative p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-elevated"
                    : "border-border bg-card hover:border-primary/30 shadow-card"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                )}
                <div className="flex items-start gap-3 pr-8">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div className="text-sm space-y-0.5">
                    <p className="font-semibold">{addr.fullName}</p>
                    <p className="text-muted-foreground">{addr.email} · {addr.phone}</p>
                    <p className="text-muted-foreground">{addr.city}, {addr.state} – {addr.pinCode}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeAddress(addr.id); }}
                  className="absolute bottom-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add new address */}
      {!showForm ? (
        <Button
          variant="outline"
          onClick={() => setShowForm(true)}
          className="w-full h-12 rounded-xl border-dashed border-2 text-muted-foreground hover:text-foreground hover:border-primary/40"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Address
        </Button>
      ) : (
        <div className="bg-card rounded-2xl border shadow-card p-5 sm:p-6">
          <h3 className="font-semibold mb-4 text-sm flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" /> New Address
          </h3>
          <form onSubmit={handleSaveAddress} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.key} className={f.half ? "" : "sm:col-span-2"}>
                  <Label htmlFor={f.key} className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
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
                    className={`mt-1.5 h-11 rounded-xl ${errors[f.key] ? "border-destructive ring-1 ring-destructive" : ""}`}
                  />
                  {errors[f.key] && <p className="text-destructive text-xs mt-1">{errors[f.key]}</p>}
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              {savedAddresses.length > 0 && (
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)} className="h-10">
                  Cancel
                </Button>
              )}
              <Button type="submit" className="h-10 rounded-xl px-6">
                Save Address
              </Button>
            </div>
          </form>
        </div>
      )}

      <StickyBottomBar>
        <Button variant="outline" onClick={() => setStep("cart")} className="h-12 rounded-xl px-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <Button
          onClick={() => setStep("payment")}
          disabled={!canProceed}
          className="flex-1 h-12 rounded-xl font-semibold text-base"
        >
          Continue to Payment <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </StickyBottomBar>
    </div>
  );
};

export default ShippingStep;
