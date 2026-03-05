import { CheckoutProvider, useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";
import CartStep from "@/components/CartStep";
import ShippingStep from "@/components/ShippingStep";
import PaymentStep from "@/components/PaymentStep";
import { Leaf } from "lucide-react";

const CheckoutFlow = () => {
  const { step } = useCheckout();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-2">
          <Leaf className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-lg">EcoCart</span>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        {step !== "success" && <StepIndicator />}
        {step === "cart" && <CartStep />}
        {step === "shipping" && <ShippingStep />}
        {step === "payment" && <PaymentStep />}
        {step === "success" && <PaymentStep />}
      </main>
    </div>
  );
};

const Index = () => (
  <CheckoutProvider>
    <CheckoutFlow />
  </CheckoutProvider>
);

export default Index;
