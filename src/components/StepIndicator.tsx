import { useCheckout } from "@/context/CheckoutContext";
import { Check } from "lucide-react";

const steps = [
  { key: "cart", label: "Cart" },
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
] as const;

const stepOrder = ["cart", "shipping", "payment", "success"] as const;

const StepIndicator = () => {
  const { step } = useCheckout();
  const currentIdx = stepOrder.indexOf(step);

  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((s, i) => {
        const isCompleted = currentIdx > i || step === "success";
        const isActive = stepOrder[currentIdx] === s.key;

        return (
          <div key={s.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isActive
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`text-xs mt-1.5 font-medium ${
                  isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-colors duration-300 ${
                  currentIdx > i ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
